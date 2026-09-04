"use client";

declare global {
  interface Window {
    OneSignalDeferred?: Array<(OneSignal: any) => void>;
    OneSignal?: any;
  }
}

let isInitialized = false;

export function initOneSignal(userId?: string) {
  if (typeof window === "undefined") return;

  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "7c0fb351-bfa1-4030-960f-23a4e48f3037";

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    if (isInitialized) return;

    await OneSignal.init({
      appId,
      safari_web_id: "web.onesignal.auto.11a76d30-e2a9-4f46-9be9-382fbd4a01f1",
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerPath: "OneSignalSDKWorker.js",
      serviceWorkerParam: { scope: "/" },
      notifyButton: {
        enable: true,
      },
    });

    isInitialized = true;

    // Tag current user as admin
    await OneSignal.User.addTags({
      role: "admin",
      app: "codey_dev_admin",
    });

    // If a Supabase user ID is provided, identify them with OneSignal
    if (userId) {
      await OneSignal.login(userId);
    }
  });
}

export async function requestPushPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  return new Promise((resolve) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        await OneSignal.Slidedown.promptPush();
        const permission = await OneSignal.Notifications.permission;
        resolve(permission === true || permission === "granted");
      } catch (err) {
        console.error("Failed to request push permission:", err);
        resolve(false);
      }
    });
  });
}

export async function getPushPermissionState(): Promise<"granted" | "denied" | "default"> {
  if (typeof window === "undefined" || !("Notification" in window)) return "default";
  return Notification.permission as "granted" | "denied" | "default";
}

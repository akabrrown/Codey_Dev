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

  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  if (!appId) {
    console.warn("OneSignal: NEXT_PUBLIC_ONESIGNAL_APP_ID is not configured.");
    return;
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    if (isInitialized) return;

    await OneSignal.init({
      appId,
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerPath: "OneSignalSDKWorker.js",
      serviceWorkerParam: { scope: "/" },
      notifyButton: {
        enable: false,
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

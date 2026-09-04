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

    try {
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
    } catch (err: any) {
      if (err?.message?.includes("already initialized")) {
        isInitialized = true;
      } else {
        console.warn("[OneSignal] Initialization error:", err?.message || err);
      }
    }

    try {
      if (isInitialized && OneSignal.User?.addTags) {
        await OneSignal.User.addTags({
          role: "admin",
          app: "codey_dev_admin",
        });
      }

      if (isInitialized && userId && OneSignal.login) {
        await OneSignal.login(userId);
      }
    } catch (err) {
      console.warn("[OneSignal] User setup warning:", err);
    }
  });
}

export async function requestPushPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (!("Notification" in window)) {
    throw new Error("This browser does not support push notifications.");
  }

  if (Notification.permission === "denied") {
    throw new Error(
      "Notifications are currently blocked in your browser settings. Please click the site settings/lock icon in your address bar and toggle Notifications to 'Allow'."
    );
  }

  return new Promise((resolve) => {
    // 6-second fallback to prevent UI hanging
    const fallbackTimer = setTimeout(async () => {
      try {
        const perm = await Notification.requestPermission();
        resolve(perm === "granted");
      } catch {
        resolve(false);
      }
    }, 6000);

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        // Trigger native permission or SDK opt-in
        if (OneSignal.Notifications?.requestPermission) {
          await OneSignal.Notifications.requestPermission();
        } else if (OneSignal.User?.PushSubscription?.optIn) {
          await OneSignal.User.PushSubscription.optIn();
        } else if (OneSignal.Slidedown?.promptPush) {
          await OneSignal.Slidedown.promptPush();
        } else {
          await Notification.requestPermission();
        }

        clearTimeout(fallbackTimer);
        const isGranted =
          Notification.permission === "granted" ||
          OneSignal.Notifications?.permission === true ||
          OneSignal.User?.PushSubscription?.optedIn === true;

        resolve(isGranted);
      } catch (err: any) {
        clearTimeout(fallbackTimer);
        console.warn("[OneSignal] Request prompt error, falling back to native:", err);
        try {
          const perm = await Notification.requestPermission();
          resolve(perm === "granted");
        } catch {
          resolve(false);
        }
      }
    });
  });
}

export async function getPushPermissionState(): Promise<{
  permission: "granted" | "denied" | "default";
  subscriptionId?: string | null;
  optedIn?: boolean;
}> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { permission: "default" };
  }

  const permission = Notification.permission as "granted" | "denied" | "default";
  let subscriptionId: string | null = null;
  let optedIn = false;

  if (window.OneSignal?.User?.PushSubscription) {
    try {
      subscriptionId = window.OneSignal.User.PushSubscription.id || null;
      optedIn = window.OneSignal.User.PushSubscription.optedIn || false;
    } catch {
      // Ignore
    }
  }

  return { permission, subscriptionId, optedIn };
}

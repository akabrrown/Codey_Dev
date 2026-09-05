interface OneSignalNotificationParams {
  title: string;
  message: string;
  url?: string;
  data?: Record<string, unknown>;
  tag?: string;
}

export async function sendOneSignalAdminNotification(params: OneSignalNotificationParams) {
  const appId =
    process.env["ONESIGNAL_APP_ID"] ||
    process.env["NEXT_PUBLIC_ONESIGNAL_APP_ID"] ||
    "7c0fb351-bfa1-4030-960f-23a4e48f3037";
  const apiKey = process.env["ONESIGNAL_REST_API_KEY"];
  const adminUrl = process.env["ADMIN_PORTAL_URL"] || "https://admincodeydev.vercel.app";

  if (!appId || !apiKey) {
    console.log(
      `[ONESIGNAL SIMULATION] Push notification to admin: "${params.title}" — "${params.message}" (Set ONESIGNAL_APP_ID & ONESIGNAL_REST_API_KEY in environment variables to enable live delivery)`
    );
    return { success: true, simulated: true };
  }

  const destinationUrl = params.url?.startsWith("http")
    ? params.url
    : `${adminUrl}${params.url || "/admin"}`;

  const payload = {
    app_id: appId,
    included_segments: ["Total Subscriptions"],
    headings: { en: params.title },
    contents: { en: params.message },
    url: destinationUrl,
    web_url: destinationUrl,
    app_url: destinationUrl,
    chrome_web_icon: "https://codeydev.vercel.app/notification-icon.png",
    chrome_web_badge: "https://codeydev.vercel.app/notification-icon.png",
    firefox_icon: "https://codeydev.vercel.app/notification-icon.png",
    small_icon: "https://codeydev.vercel.app/notification-icon.png",
    large_icon: "https://codeydev.vercel.app/notification-icon.png",
    data: {
      url: destinationUrl,
      ...params.data,
    },
    web_buttons: [
      {
        id: "view-request",
        text: "View Request →",
        icon: "https://codeydev.vercel.app/notification-icon.png",
        url: destinationUrl,
      },
    ],
  };

  try {
    const res = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${apiKey.trim()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("OneSignal API error:", data);
      return { success: false, error: data };
    }

    console.log(`[ONESIGNAL] Notification dispatched successfully! Recipients: ${data.recipients || 0}`);
    return { success: true, data };
  } catch (error: any) {
    console.error("OneSignal dispatch failed:", error?.message || error);
    return { success: false, error: error?.message || "Failed to dispatch notification" };
  }
}

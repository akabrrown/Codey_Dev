"use client";

import { useEffect } from "react";
import Script from "next/script";
import { initOneSignal } from "../../lib/onesignal";

export default function OneSignalInitializer({ userId }: { userId?: string }) {
  useEffect(() => {
    initOneSignal(userId);
  }, [userId]);

  return (
    <Script
      src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      strategy="afterInteractive"
      onLoad={() => {
        initOneSignal(userId);
      }}
    />
  );
}

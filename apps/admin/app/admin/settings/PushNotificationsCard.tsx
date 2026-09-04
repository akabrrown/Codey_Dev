"use client";

import { useState, useEffect } from "react";
import { requestPushPermission, getPushPermissionState } from "../../../lib/onesignal";
import { fetchWithAuth } from "../../../lib/api-client";

export default function PushNotificationsCard() {
  const [permission, setPermission] = useState<"granted" | "denied" | "default">("default");
  const [isRequesting, setIsRequesting] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    getPushPermissionState().then(setPermission);
  }, []);

  const handleEnablePush = async () => {
    setIsRequesting(true);
    setTestStatus(null);
    try {
      const granted = await requestPushPermission();
      const newState = await getPushPermissionState();
      setPermission(newState);
      if (granted || newState === "granted") {
        setTestStatus("✅ Push notifications enabled! You will now receive alerts on this device.");
      } else if (newState === "denied") {
        setTestStatus("❌ Notifications blocked in browser settings. Please allow notifications in your browser address bar.");
      }
    } catch (err: any) {
      setTestStatus(`Error: ${err?.message || "Failed to prompt push permission"}`);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSendTestPush = async () => {
    setIsTesting(true);
    setTestStatus(null);
    try {
      const res = await fetchWithAuth("/api/v1/admin/push/test", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus(data.data.message || "✅ Test notification sent successfully!");
      } else {
        setTestStatus(`❌ ${data.error?.message || "Failed to dispatch test notification"}`);
      }
    } catch (err: any) {
      setTestStatus(`❌ Network error: ${err?.message || "Unable to reach API"}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="card-title">OneSignal Push Notifications</h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
            Receive instant popup alerts on this device whenever a client submits a new project quote inquiry.
          </p>
        </div>
        <span
          className={`badge ${
            permission === "granted"
              ? "badge-approved"
              : permission === "denied"
              ? "badge-declined"
              : "badge-quote_sent"
          }`}
        >
          {permission === "granted"
            ? "● Active"
            : permission === "denied"
            ? "● Blocked"
            : "● Not Enabled"}
        </span>
      </div>

      <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          {permission !== "granted" ? (
            <button
              onClick={handleEnablePush}
              disabled={isRequesting}
              className="btn btn-navy"
            >
              {isRequesting ? "Prompting Permission..." : "🔔 Enable Push Notifications"}
            </button>
          ) : (
            <button
              onClick={handleEnablePush}
              disabled={isRequesting}
              className="btn btn-outline"
            >
              🔔 Re-prompt Device Subscription
            </button>
          )}

          <button
            onClick={handleSendTestPush}
            disabled={isTesting}
            className="btn btn-outline"
          >
            {isTesting ? "Sending Test..." : "🚀 Send Test Notification"}
          </button>
        </div>

        {testStatus && (
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              backgroundColor: testStatus.startsWith("✅") ? "#ECFDF5" : "#FEF2F2",
              color: testStatus.startsWith("✅") ? "#065F46" : "#991B1B",
              border: `1px solid ${testStatus.startsWith("✅") ? "#A7F3D0" : "#FECACA"}`,
            }}
          >
            {testStatus}
          </div>
        )}

        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
          <strong>How it works:</strong> Notifications are powered by OneSignal. When enabled, your browser registers a secure device token. Whenever a customer completes a quote on the public website, a native banner will appear on your desktop or mobile device. Clicking the banner will open the inquiry directly.
        </div>
      </div>
    </div>
  );
}

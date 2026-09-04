"use client";

import { useState, useEffect } from "react";
import { requestPushPermission, getPushPermissionState } from "../../../lib/onesignal";
import { fetchWithAuth } from "../../../lib/api-client";

export default function PushNotificationsCard() {
  const [permission, setPermission] = useState<"granted" | "denied" | "default">("default");
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const refreshState = async () => {
    const state = await getPushPermissionState();
    setPermission(state.permission);
    if (state.subscriptionId) setSubscriptionId(state.subscriptionId);
  };

  useEffect(() => {
    refreshState();
    const interval = setInterval(refreshState, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEnablePush = async () => {
    setIsRequesting(true);
    setTestStatus(null);
    try {
      const granted = await requestPushPermission();
      await refreshState();
      if (granted || Notification.permission === "granted") {
        setTestStatus("✅ Push notifications enabled! This device is registered.");
      } else if (Notification.permission === "denied") {
        setTestStatus("❌ Notifications blocked in browser. Click the lock/settings icon next to your browser URL and toggle Notifications to 'Allow'.");
      } else {
        setTestStatus("ℹ️ Notification prompt completed. If you didn't see the popup, please check your browser address bar.");
      }
    } catch (err: any) {
      setTestStatus(`❌ ${err?.message || "Failed to prompt push permission"}`);
    } finally {
      setIsRequesting(false);
      refreshState();
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
            Receive instant alerts on this device whenever a client submits a new project quote inquiry.
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
            ? "● Active (Receiving Push)"
            : permission === "denied"
            ? "● Blocked by Browser"
            : "● Not Enabled"}
        </span>
      </div>

      <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {permission === "denied" && (
          <div
            style={{
              padding: "0.875rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.8125rem",
              backgroundColor: "#FEF2F2",
              color: "#991B1B",
              border: "1px solid #FECACA",
              lineHeight: 1.5,
            }}
          >
            <strong>Browser Block Detected:</strong> Your browser has notifications set to "Blocked" for this site.
            <br />
            To fix: Click the <strong>tune/sliders or lock icon</strong> in your browser URL bar (to the left of <code>localhost</code> or <code>admincodeydev.vercel.app</code>) and switch <strong>Notifications</strong> to <strong>Allow</strong>, then refresh the page.
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          {permission !== "granted" ? (
            <button
              onClick={handleEnablePush}
              disabled={isRequesting}
              className="btn btn-navy"
            >
              {isRequesting ? "Requesting..." : "🔔 Enable Push Notifications"}
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

        {subscriptionId && (
          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            <strong>Device Subscription ID:</strong> <code style={{ fontSize: "0.7rem" }}>{subscriptionId}</code>
          </div>
        )}

        {testStatus && (
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              backgroundColor: testStatus.startsWith("✅") ? "#ECFDF5" : testStatus.startsWith("ℹ️") ? "#EFF6FF" : "#FEF2F2",
              color: testStatus.startsWith("✅") ? "#065F46" : testStatus.startsWith("ℹ️") ? "#1E40AF" : "#991B1B",
              border: `1px solid ${testStatus.startsWith("✅") ? "#A7F3D0" : testStatus.startsWith("ℹ️") ? "#BFDBFE" : "#FECACA"}`,
            }}
          >
            {testStatus}
          </div>
        )}

        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
          <strong>How it works:</strong> When enabled, your browser registers a secure OneSignal device token. Whenever a customer submits a project inquiry on the main website, a native banner will appear on your desktop or mobile device.
        </div>
      </div>
    </div>
  );
}

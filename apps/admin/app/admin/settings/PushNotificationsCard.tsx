"use client";

import { useState, useEffect } from "react";
import { requestPushPermission, getPushPermissionState } from "../../../lib/onesignal";
import { fetchWithAuth } from "../../../lib/api-client";

interface StatusMessage {
  type: "success" | "error" | "info";
  message: string;
}

export default function PushNotificationsCard() {
  const [permission, setPermission] = useState<"granted" | "denied" | "default">("default");
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);
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
    setStatus(null);
    try {
      const granted = await requestPushPermission();
      await refreshState();
      if (granted || Notification.permission === "granted") {
        setStatus({
          type: "success",
          message: "Push notifications enabled. This device is now registered to receive project alerts.",
        });
      } else if (Notification.permission === "denied") {
        setStatus({
          type: "error",
          message: "Notifications are blocked in your browser. Click the site settings icon in your address bar and change Notifications to 'Allow'.",
        });
      } else {
        setStatus({
          type: "info",
          message: "Notification prompt completed. Please check your browser address bar if permissions were requested.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Failed to prompt push permission.",
      });
    } finally {
      setIsRequesting(false);
      refreshState();
    }
  };

  const handleSendTestPush = async () => {
    setIsTesting(true);
    setStatus(null);
    try {
      const res = await fetchWithAuth("/api/v1/admin/push/test", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: data.data.message || "Test notification dispatched successfully.",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error?.message || "Failed to dispatch test notification.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: `Network error: ${err?.message || "Unable to reach API"}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="card-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            OneSignal Push Notifications
          </h2>
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
            ? "Active (Receiving Push)"
            : permission === "denied"
            ? "Blocked by Browser"
            : "Not Enabled"}
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
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              lineHeight: 1.5,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: "0.125rem" }}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Browser Block Detected:</strong> Notifications are currently blocked in your browser settings for this origin.
              <br />
              To enable: Click the <strong>tune/sliders or lock icon</strong> in your browser address bar, set <strong>Notifications</strong> to <strong>Allow</strong>, and refresh the page.
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          {permission !== "granted" ? (
            <button
              onClick={handleEnablePush}
              disabled={isRequesting}
              className="btn btn-navy"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              {isRequesting ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animation: "spin 1s linear infinite" }}
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span>Requesting Permission...</span>
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span>Enable Push Notifications</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleEnablePush}
              disabled={isRequesting}
              className="btn btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Re-sync Device Subscription</span>
            </button>
          )}

          <button
            onClick={handleSendTestPush}
            disabled={isTesting}
            className="btn btn-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            {isTesting ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: "spin 1s linear infinite" }}
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span>Sending Test...</span>
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>Send Test Notification</span>
              </>
            )}
          </button>
        </div>

        {subscriptionId && (
          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
            <strong>Device Subscription ID:</strong> <code style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono, monospace)" }}>{subscriptionId}</code>
          </div>
        )}

        {status && (
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.625rem",
              backgroundColor:
                status.type === "success"
                  ? "#ECFDF5"
                  : status.type === "info"
                  ? "#EFF6FF"
                  : "#FEF2F2",
              color:
                status.type === "success"
                  ? "#065F46"
                  : status.type === "info"
                  ? "#1E40AF"
                  : "#991B1B",
              border: `1px solid ${
                status.type === "success"
                  ? "#A7F3D0"
                  : status.type === "info"
                  ? "#BFDBFE"
                  : "#FECACA"
              }`,
            }}
          >
            {status.type === "success" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: "0.125rem" }}
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : status.type === "info" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: "0.125rem" }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: "0.125rem" }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
          <strong>How it works:</strong> When enabled, your browser registers a secure OneSignal device token. Whenever a customer submits a project inquiry on the main website, a native banner will appear on your desktop or mobile device.
        </div>
      </div>
    </div>
  );
}

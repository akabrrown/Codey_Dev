import { type NextRequest } from "next/server";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../../lib/api-helpers";
import { sendOneSignalAdminNotification } from "../../../../../../lib/services/onesignal";

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });
    }

    const result = await sendOneSignalAdminNotification({
      title: "Test Notification from Codey Dev",
      message: "OneSignal push notifications are working! You will now receive instant alerts for new client inquiries.",
      url: "/admin",
      data: { type: "test" },
    });

    if (!result.success) {
      return apiError(
        "ONESIGNAL_ERROR",
        typeof result.error === "object" ? JSON.stringify(result.error) : String(result.error),
        { status: 502, req }
      );
    }

    return apiResponse(
      {
        sent: true,
        simulated: (result as any).simulated || false,
        message: (result as any).simulated
          ? "Notification simulated in server logs (Configure ONESIGNAL_APP_ID & ONESIGNAL_REST_API_KEY for live delivery)"
          : "Test notification dispatched to your subscribed devices via OneSignal.",
      },
      { req }
    );
  } catch (error: any) {
    console.error("POST /api/v1/admin/push/test error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to dispatch test notification.", { status: 500, req });
  }
}

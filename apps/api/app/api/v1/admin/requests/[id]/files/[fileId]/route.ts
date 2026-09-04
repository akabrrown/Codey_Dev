import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { requestFiles } from "@codey/db";
import { eq, and } from "drizzle-orm";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../../../../lib/api-helpers";
import { generateSignedDownloadUrl } from "../../../../../../../../lib/services/cloudinary";

type RouteContext = { params: Promise<{ id: string; fileId: string }> };

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { id, fileId } = await context.params;

    // IDOR check: file must belong to this specific request
    const [file] = await db
      .select()
      .from(requestFiles)
      .where(and(eq(requestFiles.id, fileId), eq(requestFiles.requestId, id)))
      .limit(1);

    if (!file) return apiError("NOT_FOUND", "File not found.", { status: 404, req });

    const downloadUrl = generateSignedDownloadUrl(file.cloudinaryPublicId);
    return apiResponse({ downloadUrl, fileName: file.fileName, expires: "5 minutes" }, { req });
  } catch (error: any) {
    console.error("GET /api/v1/admin/requests/[id]/files/[fileId] error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to generate file download URL.", { status: 500, req });
  }
}

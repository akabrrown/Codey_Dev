import { type NextRequest } from "next/server";
import { generateSignedUploadParams } from "../../../../lib/services/cloudinary";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../lib/api-helpers";

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  // Upload signature requires authentication from the public app.
  // The public portal calls this endpoint with the anon key scoped to the upload operation.
  // This endpoint is rate-limited implicitly by Arcjet on the submission flow.
  const params = generateSignedUploadParams();
  return apiResponse(params, { headers: getCorsHeaders(req) });
}

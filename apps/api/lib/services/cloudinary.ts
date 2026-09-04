import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"],
  secure: true,
});

export function generateSignedUploadParams() {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "codey-dev/quote-uploads";
  const uploadPreset = process.env["CLOUDINARY_UPLOAD_PRESET"] ?? "codey-quote-uploads";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder, upload_preset: uploadPreset },
    process.env["CLOUDINARY_API_SECRET"] ?? ""
  );

  return {
    signature,
    timestamp,
    folder,
    upload_preset: uploadPreset,
    api_key: process.env["CLOUDINARY_API_KEY"],
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  };
}

/**
 * Generates a signed, time-limited download URL for a private Cloudinary file.
 * Only called for authenticated admin users. Expires in 5 minutes.
 */
export function generateSignedDownloadUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    sign_url: true,
    expires_at: Math.round(Date.now() / 1000) + 300, // 5 minutes
    type: "authenticated",
  });
}

export { cloudinary };

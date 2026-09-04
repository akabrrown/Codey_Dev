"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "../../../../lib/form-context";
import { formatPriceRange } from "@codey/engine";

const API_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3002";

const ACCEPTED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormErrors {
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  terms?: string;
  files?: string;
  submit?: string;
}

export default function DetailsPage() {
  const {
    formState,
    services,
    estimatedMin,
    estimatedMax,
    setContact,
    setTermsAccepted,
    addFile,
    removeFile,
    resetForm,
  } = useFormContext();

  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const service = services.find((s) => s.slug === formState.serviceSlug);
  const priceDisplay = estimatedMin === 0
    ? "Select options above"
    : formatPriceRange({ min: estimatedMin, max: estimatedMax });

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!formState.contactName.trim() || formState.contactName.trim().length < 2)
      errs.contactName = "Full name is required";
    if (!/^(?:\+233|0)[235]\d{8}$/.test(formState.contactPhone))
      errs.contactPhone = "Enter a valid Ghana phone number (e.g. 024 000 0000)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.contactEmail))
      errs.contactEmail = "Enter a valid email address";
    if (!formState.termsAccepted)
      errs.terms = "You must accept the Terms & Conditions to proceed";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function uploadFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((e) => ({ ...e, files: `${file.name} is not an accepted file type (PDF, DOCX, JPG, PNG)` }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, files: `${file.name} exceeds the 10MB limit` }));
      return;
    }
    if (formState.uploadedFiles.length >= 3) {
      setErrors((e) => ({ ...e, files: "Maximum 3 files allowed" }));
      return;
    }

    setUploading(true);
    try {
      const sigRes = await fetch(`${API_URL}/api/v1/upload-signature`);
      const { data: sigData } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", sigData.signature);
      formData.append("timestamp", String(sigData.timestamp));
      formData.append("api_key", sigData.api_key);
      formData.append("folder", sigData.folder);
      formData.append("upload_preset", sigData.upload_preset);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/auto/upload`,
        { method: "POST", body: formData }
      );

      if (!uploadRes.ok) throw new Error("Upload failed");
      const uploadData = await uploadRes.json();

      addFile({
        cloudinaryPublicId: uploadData.public_id,
        fileName: file.name,
        fileType: file.type,
        fileSizeBytes: file.size,
      });
      setErrors((e) => ({ ...e, files: undefined }));
    } catch {
      setErrors((e) => ({ ...e, files: "Upload failed. Please try again." }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch(`${API_URL}/api/v1/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: formState.serviceId,
          selectedOptionIds: formState.selectedOptionIds,
          customerName: formState.contactName,
          customerPhone: formState.contactPhone,
          customerEmail: formState.contactEmail,
          businessName: formState.businessName || undefined,
          notes: formState.notes || undefined,
          termsAccepted: formState.termsAccepted,
          uploadedFileIds: formState.uploadedFiles,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrors({ submit: json.error?.message ?? "Submission failed. Please try again." });
        return;
      }

      const { referenceNo } = json.data;
      resetForm();
      router.push(`/request/confirmation/${referenceNo}`);
    } catch {
      setErrors({ submit: "Could not reach the server. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={5}
        aria-valuemin={1}
        aria-valuemax={6}
        aria-label="Step 5 of 6"
      >
        <div className="container">
          <div className="progress-bar__inner">
            <span className="progress-bar__label">Step 5 of 6</span>
            <div className="progress-bar__track">
              <div className="progress-bar__fill" style={{ width: "83.33%" }} />
            </div>
            <span className="progress-bar__label">Your Details</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-12)" }}>
        <div className="step-layout">
          <form onSubmit={handleSubmit} noValidate aria-label="Contact and submission form">
            <a
              href={service ? `/request/${service.slug}/timeline` : "/request"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                color: "var(--color-teal)",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "var(--space-6)",
                textDecoration: "none",
              }}
            >
              ← Back
            </a>

            <h1 style={{ marginBottom: "var(--space-6)" }}>Your contact details</h1>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">
                Full name
              </label>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                value={formState.contactName}
                onChange={(e) => setContact({ contactName: e.target.value })}
                autoComplete="name"
                placeholder="Kwame Asante"
                aria-invalid={!!errors.contactName}
                aria-describedby={errors.contactName ? "err-name" : undefined}
              />
              {errors.contactName && (
                <p id="err-name" className="form-error" role="alert">{errors.contactName}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-phone">
                Phone number
              </label>
              <input
                id="contact-phone"
                type="tel"
                className="form-input"
                value={formState.contactPhone}
                onChange={(e) => setContact({ contactPhone: e.target.value })}
                autoComplete="tel"
                placeholder="024 000 0000"
                aria-invalid={!!errors.contactPhone}
                aria-describedby={errors.contactPhone ? "err-phone" : undefined}
              />
              {errors.contactPhone && (
                <p id="err-phone" className="form-error" role="alert">{errors.contactPhone}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                className="form-input"
                value={formState.contactEmail}
                onChange={(e) => setContact({ contactEmail: e.target.value })}
                autoComplete="email"
                placeholder="kwame@example.com"
                aria-invalid={!!errors.contactEmail}
                aria-describedby={errors.contactEmail ? "err-email" : undefined}
              />
              {errors.contactEmail && (
                <p id="err-email" className="form-error" role="alert">{errors.contactEmail}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="business-name">
                Business name <span className="form-label__optional">(optional)</span>
              </label>
              <input
                id="business-name"
                type="text"
                className="form-input"
                value={formState.businessName}
                onChange={(e) => setContact({ businessName: e.target.value })}
                autoComplete="organization"
                placeholder="Asante Enterprises Ltd"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="project-notes">
                Anything else we should know? <span className="form-label__optional">(optional)</span>
              </label>
              <textarea
                id="project-notes"
                className="form-textarea"
                value={formState.notes}
                onChange={(e) => setContact({ notes: e.target.value })}
                placeholder="Describe any specific requirements, reference sites you like, or questions you have."
                rows={4}
              />
            </div>

            {/* File upload */}
            <div className="form-group">
              <p className="form-label" id="upload-label">
                Attach files <span className="form-label__optional">(optional — PDF, DOCX, JPG, PNG · max 10MB each · up to 3)</span>
              </p>
              <div
                className={`upload-zone${dragOver ? " upload-zone--drag-over" : ""}`}
                role="button"
                tabIndex={0}
                aria-labelledby="upload-label"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const files = Array.from(e.dataTransfer.files);
                  files.slice(0, 3 - formState.uploadedFiles.length).forEach(uploadFile);
                }}
              >
                <div className="upload-zone__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <p className="upload-zone__text">
                  {uploading ? "Uploading..." : "Drop files here or click to upload"}
                </p>
                <p className="upload-zone__hint">PDF, DOCX, JPG, PNG — max 10MB each, up to 3 files</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="visually-hidden"
                accept=".pdf,.docx,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  files.slice(0, 3 - formState.uploadedFiles.length).forEach(uploadFile);
                  e.target.value = "";
                }}
                aria-hidden="true"
                tabIndex={-1}
              />
              {errors.files && (
                <p className="form-error" role="alert">{errors.files}</p>
              )}
              {formState.uploadedFiles.map((f) => (
                <div key={f.cloudinaryPublicId} className="uploaded-file">
                  <span className="uploaded-file__name">{f.fileName}</span>
                  <button
                    type="button"
                    className="uploaded-file__remove"
                    onClick={() => removeFile(f.cloudinaryPublicId)}
                    aria-label={`Remove ${f.fileName}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* T&C consent */}
            <div className="form-group">
              <div className="consent-row">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={formState.termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  aria-invalid={!!errors.terms}
                  aria-describedby={errors.terms ? "err-terms" : undefined}
                />
                <label className="consent-row__label" htmlFor="terms-checkbox">
                  I have read and agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms &amp; Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/policies" target="_blank" rel="noopener noreferrer">
                    Company Policies
                  </a>
                  . Submitting this form does not create a contract — Codey Dev
                  will confirm acceptance separately.
                </label>
              </div>
              {errors.terms && (
                <p id="err-terms" className="form-error" role="alert">{errors.terms}</p>
              )}
            </div>

            {errors.submit && (
              <div className="callout callout--warning" role="alert">
                <p className="callout__text">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              id="submit-request-btn"
              className="btn btn--primary btn--lg btn--full"
              disabled={submitting || uploading}
            >
              {submitting ? "Sending quote request..." : "Send Quote Request →"}
            </button>
          </form>

          {/* Live estimate confirmation */}
          <div style={{ paddingTop: "calc(var(--space-8) + 64px)" }}>
            <div className="estimate-panel" aria-label="Summary of your request estimate">
              <p className="estimate-panel__label">You are submitting</p>
              <p style={{ color: "var(--color-white)", fontSize: "1rem", fontWeight: 600, margin: "0 0 var(--space-3)" }}>
                {formState.serviceName || "No service selected"}
              </p>
              <p className="estimate-panel__label" style={{ marginBottom: "var(--space-1)" }}>Estimated range</p>
              <p className="estimate-panel__range">{priceDisplay}</p>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                  margin: "var(--space-4) 0 0",
                }}
              >
                The final confirmed price is set by Codey Dev after reviewing your request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitReviewSchema, type SubmitReviewInput } from "@codey/validators";

export default function ReviewForm() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubmitReviewInput>({
    resolver: zodResolver(SubmitReviewSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: SubmitReviewInput) => {
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/api/v1/public/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Failed to submit review");
      }

      setSubmitState("success");
      reset();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again later.");
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "var(--color-navy-dark)",
            color: "var(--color-white)",
            marginBottom: "var(--space-4)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ marginBottom: "var(--space-2)" }}>Thank you for your feedback!</h2>
        <p style={{ color: "var(--color-muted)", maxWidth: 400, margin: "0 auto" }}>
          Your review has been successfully submitted and is pending approval. We truly appreciate your time and support.
        </p>
        <button
          className="btn btn--teal-outline"
          style={{ marginTop: "var(--space-6)" }}
          onClick={() => setSubmitState("idle")}
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      {submitState === "error" && (
        <div style={{ backgroundColor: "#FEE2E2", color: "#B91C1C", padding: "var(--space-3)", borderRadius: "var(--radius-md)" }}>
          {errorMessage}
        </div>
      )}

      <div>
        <label className="label">
          Full Name <span style={{ color: "var(--color-red)" }}>*</span>
        </label>
        <input
          type="text"
          className="input"
          placeholder="e.g. Kwame Mensah"
          {...register("customerName")}
          disabled={submitState === "submitting"}
        />
        {errors.customerName && <p className="field-error">{errors.customerName.message}</p>}
      </div>

      <div>
        <label className="label">Company Name (Optional)</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. Codey Dev Ltd"
          {...register("companyName")}
          disabled={submitState === "submitting"}
        />
        {errors.companyName && <p className="field-error">{errors.companyName.message}</p>}
      </div>

      <div>
        <label className="label">
          Rating <span style={{ color: "var(--color-red)" }}>*</span>
        </label>
        <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={submitState === "submitting"}
              onClick={() => setValue("rating", star, { shouldValidate: true })}
              style={{
                background: "none",
                border: "none",
                cursor: submitState === "submitting" ? "not-allowed" : "pointer",
                padding: "4px",
              }}
              aria-label={`Rate ${star} stars`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={star <= rating ? "var(--color-teal)" : "transparent"}
                stroke={star <= rating ? "var(--color-teal)" : "var(--color-border)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          ))}
        </div>
        {errors.rating && <p className="field-error">{errors.rating.message}</p>}
      </div>

      <div>
        <label className="label">
          Your Review <span style={{ color: "var(--color-red)" }}>*</span>
        </label>
        <textarea
          className="input"
          rows={5}
          placeholder="Tell us about your experience working with Codey Dev..."
          {...register("content")}
          disabled={submitState === "submitting"}
        />
        {errors.content && <p className="field-error">{errors.content.message}</p>}
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        disabled={submitState === "submitting"}
        style={{ marginTop: "var(--space-2)" }}
      >
        {submitState === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchServerWithAuth } from "../../../../lib/api-server";
import RequestDetailClient from "./RequestDetailClient";

export const metadata: Metadata = {
  title: "Request Details",
};

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let requestData = null;

  try {
    const res = await fetchServerWithAuth(`/api/v1/admin/requests/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      notFound();
    }

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        requestData = data.data;
      }
    }
  } catch {
    // API or network failure fallback
  }

  if (!requestData) {
    notFound();
  }

  return <RequestDetailClient initialData={requestData} />;
}

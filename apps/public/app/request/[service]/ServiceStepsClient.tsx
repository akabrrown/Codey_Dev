"use client";

import { FormProvider, type ServiceData } from "../../../lib/form-context";

export default function ServiceStepsClient({
  children,
  services,
  serviceSlug,
}: {
  children: React.ReactNode;
  services: ServiceData[];
  serviceSlug: string;
}) {
  return (
    <FormProvider services={services} initialServiceSlug={serviceSlug}>
      {children}
    </FormProvider>
  );
}

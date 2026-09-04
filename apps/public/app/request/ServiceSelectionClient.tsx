"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useFormContext, type ServiceData } from "../../lib/form-context";

const SERVICE_ICONS: Record<string, string> = {
  "web-design": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  "custom-software": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  "mobile-app": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>`,
  "maintenance": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  "seo": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>`,
};

function ServiceSelectionInner({ services }: { services: ServiceData[] }) {
  const { formState, setService } = useFormContext();
  const router = useRouter();

  function handleSelect(service: ServiceData) {
    setService(service);
    router.push(`/request/${service.slug}`);
  }

  return (
    <div className="service-grid" role="list" aria-label="Available services">
      {services.map((svc) => {
        const iconSvg = SERVICE_ICONS[svc.slug] ?? SERVICE_ICONS["custom-software"];
        const isSelected = formState.serviceId === svc.id;

        return (
          <button
            key={svc.id}
            type="button"
            role="listitem"
            className={`service-card${isSelected ? " service-card--selected" : ""}`}
            onClick={() => handleSelect(svc)}
            aria-pressed={isSelected}
            aria-label={svc.name}
          >
            <div
              className="service-card__icon"
              dangerouslySetInnerHTML={{ __html: iconSvg }}
            />
            <p className="service-card__title">{svc.name}</p>
            {svc.description && (
              <p className="service-card__desc">{svc.description}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function ServiceSelectionClient({ services }: { services: ServiceData[] }) {
  return (
    <FormProvider services={services}>
      <ServiceSelectionInner services={services} />
    </FormProvider>
  );
}

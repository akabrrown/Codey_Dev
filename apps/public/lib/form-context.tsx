"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { calculateEstimate, type PricingOption } from "@codey/engine";

export interface ServiceOption {
  id: string;
  serviceId: string;
  label: string;
  optionType: string;
  priceImpact: string;
  isMultiplier: boolean;
  multiplierValue: string | null;
  helperText: string | null;
  sortOrder: number;
}

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePriceMin: string;
  basePriceMax: string;
  options: ServiceOption[];
}

export interface UploadedFile {
  cloudinaryPublicId: string;
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
}

export interface FormState {
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  basePriceMin: number;
  basePriceMax: number;
  selectedOptionIds: string[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  businessName: string;
  notes: string;
  termsAccepted: boolean;
  uploadedFiles: UploadedFile[];
}

interface FormContextValue {
  formState: FormState;
  services: ServiceData[];
  estimatedMin: number;
  estimatedMax: number;
  setService: (service: ServiceData) => void;
  toggleOption: (optionId: string, options: ServiceOption[]) => void;
  setContact: (fields: Partial<Pick<FormState, "contactName" | "contactPhone" | "contactEmail" | "businessName" | "notes">>) => void;
  setTermsAccepted: (v: boolean) => void;
  addFile: (file: UploadedFile) => void;
  removeFile: (publicId: string) => void;
  resetForm: () => void;
}

const STORAGE_KEY = "codey-quote-form";

const emptyForm: FormState = {
  serviceId: "",
  serviceSlug: "",
  serviceName: "",
  basePriceMin: 0,
  basePriceMax: 0,
  selectedOptionIds: [],
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  businessName: "",
  notes: "",
  termsAccepted: false,
  uploadedFiles: [],
};

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children, services }: { children: React.ReactNode; services: ServiceData[] }) {
  const [formState, setFormState] = useState<FormState>(() => {
    if (typeof window === "undefined") return emptyForm;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as FormState) : emptyForm;
    } catch {
      return emptyForm;
    }
  });

  // Persist to sessionStorage on every change so back-navigation doesn't lose selections
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    } catch {
      // sessionStorage unavailable — continue without persistence
    }
  }, [formState]);

  const estimate = (() => {
    if (!formState.serviceId) return { min: 0, max: 0 };
    const service = services.find((s) => s.id === formState.serviceId);
    if (!service) return { min: 0, max: 0 };

    const selectedOptions: PricingOption[] = formState.selectedOptionIds.flatMap((id) => {
      const opt = service.options.find((o) => o.id === id);
      if (!opt) return [];
      return [{
        priceImpact: Number(opt.priceImpact),
        isMultiplier: opt.isMultiplier,
        multiplierValue: opt.multiplierValue ? Number(opt.multiplierValue) : undefined,
      }];
    });

    return calculateEstimate(
      Number(service.basePriceMin),
      Number(service.basePriceMax),
      selectedOptions
    );
  })();

  const setService = useCallback((service: ServiceData) => {
    setFormState((prev) => ({
      ...emptyForm,
      serviceId: service.id,
      serviceSlug: service.slug,
      serviceName: service.name,
      basePriceMin: Number(service.basePriceMin),
      basePriceMax: Number(service.basePriceMax),
    }));
  }, []);

  const toggleOption = useCallback((optionId: string, options: ServiceOption[]) => {
    const opt = options.find((o) => o.id === optionId);
    if (!opt) return;

    setFormState((prev) => {
      let next = [...prev.selectedOptionIds];

      // Timeline options: only one can be active at a time
      if (opt.optionType === "timeline") {
        const timelineIds = options.filter((o) => o.optionType === "timeline").map((o) => o.id);
        next = next.filter((id) => !timelineIds.includes(id));
        next.push(optionId);
        return { ...prev, selectedOptionIds: next };
      }

      // Subtype options: single-select within the service
      if (opt.optionType === "subtype") {
        const subtypeIds = options.filter((o) => o.optionType === "subtype").map((o) => o.id);
        next = next.filter((id) => !subtypeIds.includes(id));
        next.push(optionId);
        return { ...prev, selectedOptionIds: next };
      }

      // All other options: toggle
      if (next.includes(optionId)) {
        return { ...prev, selectedOptionIds: next.filter((id) => id !== optionId) };
      }
      return { ...prev, selectedOptionIds: [...next, optionId] };
    });
  }, []);

  const setContact = useCallback(
    (fields: Partial<Pick<FormState, "contactName" | "contactPhone" | "contactEmail" | "businessName" | "notes">>) => {
      setFormState((prev) => ({ ...prev, ...fields }));
    },
    []
  );

  const setTermsAccepted = useCallback((v: boolean) => {
    setFormState((prev) => ({ ...prev, termsAccepted: v }));
  }, []);

  const addFile = useCallback((file: UploadedFile) => {
    setFormState((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles.slice(0, 2), file], // max 3
    }));
  }, []);

  const removeFile = useCallback((publicId: string) => {
    setFormState((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((f) => f.cloudinaryPublicId !== publicId),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(emptyForm);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <FormContext.Provider
      value={{
        formState,
        services,
        estimatedMin: estimate.min,
        estimatedMax: estimate.max,
        setService,
        toggleOption,
        setContact,
        setTermsAccepted,
        addFile,
        removeFile,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used inside FormProvider");
  return ctx;
}

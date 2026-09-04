"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../lib/api-client";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePriceMin: number;
  basePriceMax: number;
}

interface ServiceOptionItem {
  id: string;
  serviceId: string;
  label: string;
  optionType: "subtype" | "page" | "feature" | "integration" | "timeline";
  priceImpact: string;
  isMultiplier: boolean;
  multiplierValue: string | null;
  helperText?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function PricingManagerClient({
  initialServices = [],
}: {
  initialServices?: ServiceItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServices[0]?.id || ""
  );
  const [options, setOptions] = useState<ServiceOptionItem[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add option form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<"subtype" | "page" | "feature" | "integration" | "timeline">("feature");
  const [newPriceGhs, setNewPriceGhs] = useState("");
  const [newIsMultiplier, setNewIsMultiplier] = useState(false);
  const [newMultiplier, setNewMultiplier] = useState("1.25");
  const [newHelperText, setNewHelperText] = useState("");
  const [adding, setAdding] = useState(false);

  // Edit Service Base Price state
  const [editingBase, setEditingBase] = useState(false);
  const [baseMinGhs, setBaseMinGhs] = useState("");
  const [baseMaxGhs, setBaseMaxGhs] = useState("");
  const [savingBase, setSavingBase] = useState(false);

  // Feedback notification states
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  // Edit Option state
  const [editingOption, setEditingOption] = useState<ServiceOptionItem | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editType, setEditType] = useState<"subtype" | "page" | "feature" | "integration" | "timeline">("feature");
  const [editPriceGhs, setEditPriceGhs] = useState("");
  const [editIsMultiplier, setEditIsMultiplier] = useState(false);
  const [editMultiplier, setEditMultiplier] = useState("1.25");
  const [editHelperText, setEditHelperText] = useState("");
  const [savingOption, setSavingOption] = useState(false);

  const loadServiceOptions = async (serviceId: string) => {
    if (!serviceId) return;
    setLoadingOptions(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`/api/v1/admin/pricing/${serviceId}`);
      if (!res.ok) throw new Error("Failed to load options");
      const data = await res.json();
      if (data.success) {
        setOptions(data.data.options || []);
        if (data.data.service) {
          setServices((prev) =>
            prev.map((s) => (s.id === serviceId ? { ...s, ...data.data.service } : s))
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading service pricing options.");
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    if (selectedServiceId) {
      loadServiceOptions(selectedServiceId);
      const svc = services.find((s) => s.id === selectedServiceId);
      if (svc) {
        setBaseMinGhs(String(Number(svc.basePriceMin)));
        setBaseMaxGhs(String(Number(svc.basePriceMax)));
      }
    }
  }, [selectedServiceId]);

  const handleSaveBasePrices = async (e: React.FormEvent) => {
    e.preventDefault();
    const minVal = parseFloat(baseMinGhs);
    const maxVal = parseFloat(baseMaxGhs);
    if (isNaN(minVal) || isNaN(maxVal) || minVal < 0 || maxVal < minVal) {
      setFeedback({
        type: "error",
        message: "Please enter valid positive amounts. Maximum price must be greater than or equal to minimum price.",
      });
      return;
    }

    setSavingBase(true);
    setFeedback(null);
    try {
      const res = await fetchWithAuth(`/api/v1/admin/pricing/${selectedServiceId}`, {
        method: "PATCH",
        body: JSON.stringify({
          basePriceMin: minVal,
          basePriceMax: maxVal,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to update base price range.");
      }

      setServices((prev) =>
        prev.map((s) =>
          s.id === selectedServiceId
            ? { ...s, basePriceMin: minVal, basePriceMax: maxVal }
            : s
        )
      );
      setEditingBase(false);
      setFeedback({ type: "success", message: "Base rates updated successfully." });
    } catch (err) {
      setFeedback({ type: "error", message: err instanceof Error ? err.message : "Failed to update base prices." });
    } finally {
      setSavingBase(false);
    }
  };

  const openEditOption = (option: ServiceOptionItem) => {
    setEditingOption(option);
    setEditLabel(option.label);
    setEditType(option.optionType);
    setEditPriceGhs(String(Number(option.priceImpact)));
    setEditIsMultiplier(option.isMultiplier);
    setEditMultiplier(option.multiplierValue ? String(option.multiplierValue) : "1.25");
    setEditHelperText(option.helperText || "");
  };

  const handleUpdateOption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOption || !editLabel.trim()) return;
    setSavingOption(true);

    try {
      const priceImpactVal = editIsMultiplier ? 0 : parseFloat(editPriceGhs || "0");
      const payload = {
        label: editLabel.trim(),
        optionType: editType,
        priceImpact: priceImpactVal,
        isMultiplier: editIsMultiplier,
        multiplierValue: editIsMultiplier ? parseFloat(editMultiplier) : undefined,
        helperText: editHelperText.trim() || undefined,
      };

      const res = await fetchWithAuth(
        `/api/v1/admin/pricing/${selectedServiceId}/options/${editingOption.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error?.message || "Failed to update option.");
      }

      setOptions((prev) =>
        prev.map((o) => (o.id === editingOption.id ? { ...o, ...resData.data } : o))
      );
      setEditingOption(null);
      setFeedback({ type: "success", message: `Option "${editingOption.label}" updated successfully.` });
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Failed to update option.");
    } finally {
      setSavingOption(false);
    }
  };

  const handleToggleActive = async (option: ServiceOptionItem) => {
    try {
      const updatedActive = !option.isActive;
      const res = await fetchWithAuth(
        `/api/v1/admin/pricing/${selectedServiceId}/options/${option.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ isActive: updatedActive }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      setOptions((prev) =>
        prev.map((o) => (o.id === option.id ? { ...o, isActive: updatedActive } : o))
      );
      setFeedback({
        type: "success",
        message: `Option "${option.label}" ${updatedActive ? "enabled" : "disabled"} successfully.`,
      });
    } catch (err) {
      setFeedback({ type: "error", message: "Failed to toggle option status." });
    }
  };

  const handleAddOption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setAdding(true);
    setModalError(null);

    try {
      const priceImpactVal = newIsMultiplier ? 0 : parseFloat(newPriceGhs || "0");

      const payload = {
        label: newLabel.trim(),
        optionType: newType,
        priceImpact: priceImpactVal,
        isMultiplier: newIsMultiplier,
        multiplierValue: newIsMultiplier ? parseFloat(newMultiplier) : undefined,
        helperText: newHelperText.trim() || undefined,
        sortOrder: options.length + 1,
      };

      const res = await fetchWithAuth(`/api/v1/admin/pricing/${selectedServiceId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error?.message || "Failed to add option");
      }

      setOptions((prev) => [...prev, resData.data]);
      setShowAddModal(false);
      setNewLabel("");
      setNewPriceGhs("");
      setNewHelperText("");
      setFeedback({ type: "success", message: `Option "${payload.label}" added successfully.` });
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Error adding new option");
    } finally {
      setAdding(false);
    }
  };

  const formatGHS = (val: number | string) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(num || 0);
  };

  const currentService = services.find((s) => s.id === selectedServiceId);

  return (
    <div>
      {/* Service Selector Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
        {services.map((srv) => (
          <button
            key={srv.id}
            onClick={() => setSelectedServiceId(srv.id)}
            className={`btn ${srv.id === selectedServiceId ? "btn-navy" : "btn-outline"}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {srv.name}
          </button>
        ))}
      </div>

      {feedback && (
        <div style={{
          padding: "0.75rem 1rem",
          marginBottom: "1.25rem",
          borderRadius: "var(--radius-md)",
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: feedback.type === "success" ? "#DCFCE7" : "#FEE2E2",
          border: `1px solid ${feedback.type === "success" ? "#86EFAC" : "#FCA5A5"}`,
          color: feedback.type === "success" ? "#15803D" : "#B91C1C",
        }}>
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: 700 }}
            aria-label="Dismiss feedback message"
          >
            ✕
          </button>
        </div>
      )}

      {currentService && (
        <div className="card" style={{ marginBottom: "1.5rem", backgroundColor: "#F8FAFC" }}>
          <div className="card-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy-dark)" }}>
                {currentService.name} Base Rate
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                {currentService.description}
              </p>
            </div>
            
            {editingBase ? (
              <form onSubmit={handleSaveBasePrices} style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Min Price (GH₵)
                  </label>
                  <input
                    type="number"
                    required
                    value={baseMinGhs}
                    onChange={(e) => setBaseMinGhs(e.target.value)}
                    className="form-input"
                    style={{ width: "120px", padding: "0.375rem 0.5rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Max Price (GH₵)
                  </label>
                  <input
                    type="number"
                    required
                    value={baseMaxGhs}
                    onChange={(e) => setBaseMaxGhs(e.target.value)}
                    className="form-input"
                    style={{ width: "120px", padding: "0.375rem 0.5rem" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
                  <button type="submit" disabled={savingBase} className="btn btn-primary btn-sm">
                    {savingBase ? "Saving..." : "Save Rate"}
                  </button>
                  <button type="button" onClick={() => setEditingBase(false)} className="btn btn-outline btn-sm">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                    Base Price Range
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy-dark)" }}>
                    {formatGHS(currentService.basePriceMin)} – {formatGHS(currentService.basePriceMax)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBase(true)}
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Edit Base Rate</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Options Table Card */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3 className="card-title">Configured Pricing Options & Add-ons</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.125rem" }}>
              Configure base add-ons, feature modules, integrations, and rush timeline multipliers.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 600 }}
          >
            + Add Option
          </button>
        </div>

        {error && (
          <div style={{ padding: "1rem 1.5rem", color: "#B91C1C", backgroundColor: "#FEE2E2", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {loadingOptions ? (
          <div className="table-container" aria-label="Loading pricing rules...">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Option Label</th>
                  <th>Category</th>
                  <th>Price Impact (GH₵)</th>
                  <th>Description / Helper</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td><span className="skeleton" style={{ width: "160px", height: "1.125rem" }} /></td>
                    <td><span className="skeleton" style={{ width: "80px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} /></td>
                    <td><span className="skeleton" style={{ width: "100px", height: "1.125rem" }} /></td>
                    <td><span className="skeleton" style={{ width: "200px", height: "0.875rem" }} /></td>
                    <td><span className="skeleton" style={{ width: "60px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} /></td>
                    <td style={{ textAlign: "right" }}>
                      <span className="skeleton" style={{ width: "110px", height: "1.75rem", borderRadius: "var(--radius-sm)" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : options.length === 0 ? (
          <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "var(--color-text-muted)" }}>
            No pricing options configured for this service yet.
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Option Label</th>
                  <th>Category</th>
                  <th>Price Impact (GH₵)</th>
                  <th>Description / Helper</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {options.map((opt) => (
                  <tr key={opt.id} style={{ opacity: opt.isActive ? 1 : 0.5 }}>
                    <td>
                      <span style={{ fontWeight: 600, color: "var(--color-navy-dark)" }}>
                        {opt.label}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        display: "inline-block",
                        padding: "0.125rem 0.5rem",
                        backgroundColor: "var(--color-surface)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                      }}>
                        {opt.optionType}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: "var(--color-navy-dark)" }}>
                        {opt.isMultiplier
                          ? `${opt.multiplierValue}x multiplier`
                          : formatGHS(opt.priceImpact)}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", maxWidth: "250px" }}>
                      {opt.helperText || "—"}
                    </td>
                    <td>
                      <span style={{
                        display: "inline-block",
                        padding: "0.25rem 0.625rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: opt.isActive ? "#DCFCE7" : "#F1F5F9",
                        color: opt.isActive ? "#15803D" : "#64748B",
                      }}>
                        {opt.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
                        <button
                          onClick={() => openEditOption(opt)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: "0.25rem 0.5rem" }}
                          aria-label={`Edit ${opt.label}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(opt)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: "0.25rem 0.5rem" }}
                        >
                          {opt.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Option Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(14, 35, 56, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 60,
          padding: "1rem",
        }}>
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            width: "100%",
            maxWidth: "520px",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
          }}>
            <div className="card-header">
              <h3 className="card-title">Add New Pricing Option</h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", display: "flex", alignItems: "center" }}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddOption} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {modalError && (
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}>
                  {modalError}
                </div>
              )}
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                  Option Label *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Payment Gateway Integration (MoMo / Card)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                  Option Category *
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="form-select"
                >
                  <option value="subtype">Sub-type / Variant</option>
                  <option value="page">Page / Screen Scope</option>
                  <option value="feature">Feature Module</option>
                  <option value="integration">Third-party Integration</option>
                  <option value="timeline">Timeline / Speed</option>
                </select>
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={newIsMultiplier}
                    onChange={(e) => setNewIsMultiplier(e.target.checked)}
                  />
                  Is Multiplier (e.g. 1.25x for Rush delivery)
                </label>

                {newIsMultiplier ? (
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="5"
                    placeholder="1.25"
                    value={newMultiplier}
                    onChange={(e) => setNewMultiplier(e.target.value)}
                    className="form-input"
                  />
                ) : (
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
                      Price Addition (GH₵)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 800"
                      value={newPriceGhs}
                      onChange={(e) => setNewPriceGhs(e.target.value)}
                      className="form-input"
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                  Helper Text / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paystack / Hubtel integration for MTN MoMo & Telecel"
                  value={newHelperText}
                  onChange={(e) => setNewHelperText(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="btn btn-primary"
                >
                  {adding ? "Adding..." : "Add Option"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Option Modal */}
      {editingOption && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(14, 35, 56, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 60,
          padding: "1rem",
        }}>
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            width: "100%",
            maxWidth: "520px",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
          }}>
            <div className="card-header">
              <h3 className="card-title">Edit Pricing Option</h3>
              <button
                onClick={() => setEditingOption(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", display: "flex", alignItems: "center" }}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateOption} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {modalError && (
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}>
                  {modalError}
                </div>
              )}
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                  Option Label *
                </label>
                <input
                  type="text"
                  required
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                  Option Category *
                </label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as any)}
                  className="form-select"
                >
                  <option value="subtype">Sub-type / Variant</option>
                  <option value="page">Page / Screen Scope</option>
                  <option value="feature">Feature Module</option>
                  <option value="integration">Third-party Integration</option>
                  <option value="timeline">Timeline / Speed</option>
                </select>
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={editIsMultiplier}
                    onChange={(e) => setEditIsMultiplier(e.target.checked)}
                  />
                  Is Multiplier (e.g. 1.25x for Rush delivery)
                </label>

                {editIsMultiplier ? (
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="5"
                    value={editMultiplier}
                    onChange={(e) => setEditMultiplier(e.target.value)}
                    className="form-input"
                  />
                ) : (
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
                      Price Addition (GH₵)
                    </label>
                    <input
                      type="number"
                      value={editPriceGhs}
                      onChange={(e) => setEditPriceGhs(e.target.value)}
                      className="form-input"
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                  Helper Text / Description
                </label>
                <input
                  type="text"
                  value={editHelperText}
                  onChange={(e) => setEditHelperText(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setEditingOption(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingOption}
                  className="btn btn-primary"
                >
                  {savingOption ? "Saving changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

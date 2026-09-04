// Pricing engine — pure TypeScript, no framework dependency.
// Runs identically on the client (live estimate display) and server-side
// (price re-validation on submit). The client result is display-only;
// the server result is the authoritative value stored in the database.

export interface PricingOption {
  priceImpact: number;
  isMultiplier: boolean;
  multiplierValue?: number | null;
}

export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Calculates the estimated price range from a service base and selected options.
 *
 * Formula:
 *   (baseMin + Σ non-multiplier impacts) × (1 + bufferPct) × Π(multiplier values)
 *
 * The buffer accounts for revision and contingency headroom (default 12%).
 * Rush timeline adds a 25% multiplier (multiplierValue = 1.25).
 */
export function calculateEstimate(
  baseMin: number,
  baseMax: number,
  selectedOptions: PricingOption[],
  bufferPct: number = 0.12
): PriceRange {
  if (baseMin < 0 || baseMax < 0 || baseMax < baseMin) {
    throw new RangeError(
      `Invalid base price range: min=${baseMin} max=${baseMax}`
    );
  }
  if (bufferPct < 0 || bufferPct > 1) {
    throw new RangeError(`bufferPct must be between 0 and 1, got ${bufferPct}`);
  }

  let additiveImpact = 0;
  let multiplier = 1;

  for (const option of selectedOptions) {
    if (option.isMultiplier) {
      const mv = option.multiplierValue ?? 1;
      if (mv <= 0) {
        throw new RangeError(`multiplierValue must be positive, got ${mv}`);
      }
      multiplier *= mv;
    } else {
      additiveImpact += option.priceImpact;
    }
  }

  const rawMin = baseMin + additiveImpact;
  const rawMax = baseMax + additiveImpact;

  const estimatedMin = Math.round(rawMin * (1 + bufferPct) * multiplier);
  const estimatedMax = Math.round(rawMax * (1 + bufferPct) * multiplier);

  return { min: estimatedMin, max: estimatedMax };
}

/**
 * Formats a GH₵ price range as a display string.
 * e.g. { min: 14420, max: 33740 } → "GH₵ 14,420 – 33,740"
 */
export function formatPriceRange(range: PriceRange, currency = "GH₵"): string {
  const fmt = (n: number) =>
    n.toLocaleString("en-GH", { maximumFractionDigits: 0 });
  return `${currency} ${fmt(range.min)} – ${fmt(range.max)}`;
}

/**
 * Lead submission abstraction.
 *
 * ============================== NOT WIRED UP ==============================
 * TODO: there is no backend on this build. `submitLead` validates the payload
 * and returns a result so the form behaves correctly end to end, but nothing
 * is sent anywhere.
 *
 * To connect it, replace the body of `deliverLead` with one of:
 *   - a POST to /api/leads (add a route handler)
 *   - a HubSpot Forms API submission        (needs portal id + form guid)
 *   - a Pipedrive Leads API call            (needs API token)
 *   - a transactional email send            (needs provider key)
 *
 * Keep the shape of LeadPayload stable: the form, the package builder and any
 * CRM mapping all key off it.
 * =========================================================================
 */

export type BusinessType =
  | "franchise-brand"
  | "franchisee"
  | "multi-location"
  | "independent";

export type PrimaryInterest =
  | "blueprint"
  | "full-execution"
  | "seo-local"
  | "paid"
  | "social-content"
  | "automation"
  | "not-sure";

export interface LeadPayload {
  name: string;
  company: string;
  website: string;
  email: string;
  phone?: string;
  primaryMarket: string;
  additionalMarkets: string[];
  businessType: BusinessType;
  locations: number;
  primaryInterest: PrimaryInterest;
  message: string;
  /** Serialized package configuration, when the form was reached from the builder. */
  packageConfig?: string;
  /** Where the submission came from. */
  source: string;
}

export interface LeadResult {
  ok: boolean;
  error?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLead = (payload: LeadPayload): string | null => {
  if (!payload.name.trim()) return "Please add your name.";
  if (!payload.email.trim()) return "Please add an email address.";
  if (!EMAIL.test(payload.email.trim())) return "That email address doesn't look right.";
  if (!payload.primaryMarket) return "Please select your primary market.";
  if (!Number.isFinite(payload.locations) || payload.locations < 1)
    return "Please enter how many locations you have.";
  return null;
};

/**
 * TODO: replace with a real delivery mechanism. See the note at the top.
 */
const deliverLead = async (payload: LeadPayload): Promise<LeadResult> => {
  if (process.env.NODE_ENV !== "production") {
    // Visible in the browser console so the form can be exercised locally.
    console.info("[Home by Five] Lead captured (not sent, no backend):", payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 450));
  return { ok: true };
};

export const submitLead = async (payload: LeadPayload): Promise<LeadResult> => {
  const error = validateLead(payload);
  if (error) return { ok: false, error };
  try {
    return await deliverLead(payload);
  } catch {
    return {
      ok: false,
      error: "Something went wrong sending that. Please email us directly.",
    };
  }
};

export const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "franchise-brand", label: "Franchise brand" },
  { value: "franchisee", label: "Franchisee" },
  { value: "multi-location", label: "Multi-location business" },
  { value: "independent", label: "Independent local business" },
];

export const PRIMARY_INTERESTS: { value: PrimaryInterest; label: string }[] = [
  { value: "blueprint", label: "Location Growth Blueprint" },
  { value: "full-execution", label: "Full execution" },
  { value: "seo-local", label: "SEO and local search" },
  { value: "paid", label: "Paid media" },
  { value: "social-content", label: "Social and content" },
  { value: "automation", label: "Automation" },
  { value: "not-sure", label: "Not sure yet" },
];

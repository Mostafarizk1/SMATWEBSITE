/** Shape of a contact request. Mirrors the future Supabase `quote_requests` table. */
export type QuoteRequest = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: "sa" | "ae" | "kw" | "qa" | "bh" | "om" | "eg" | "tr" | "other" | "";
  service: string;
  message: string;
  locale: string;
  source: string;
};

export type QuoteField = "name" | "contact" | "email" | "phone" | "country" | "service" | "message";
export type QuoteErrors = Partial<Record<QuoteField, true>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Loose international check: optional +, then 8 to 15 digits (spaces, dashes and brackets allowed). */
const isPhone = (value: string) => /^\+?[\d\s\-()]+$/.test(value) && value.replace(/\D/g, "").length >= 8 && value.replace(/\D/g, "").length <= 15;

export function validateQuote(q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  const email = q.email.trim();
  const phone = q.phone.trim();

  if (q.name.trim().length < 2) errors.name = true;
  // We need a way to reply: at least one of email / phone, and whatever is given must be valid.
  if (!email && !phone) errors.contact = true;
  if (email && !emailPattern.test(email)) errors.email = true;
  if (phone && !isPhone(phone)) errors.phone = true;
  if (!q.country) errors.country = true;
  if (!q.service) errors.service = true;
  if (q.message.trim().length < 10) errors.message = true;
  return errors;
}

/**
 * V1: no backend. Logs the payload and resolves. To go live, replace the body with a Supabase insert
 * (or a server action) and keep the same signature: `supabase.from("quote_requests").insert(q)`.
 * The success state must only show after a real, confirmed save; add a failure message then.
 */
export async function submitQuote(q: QuoteRequest): Promise<{ ok: true }> {
  console.info("[quote-request]", q);
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}

/** Shape of a quote request. Mirrors the future Supabase `quote_requests` table. */
export type QuoteRequest = {
  name: string;
  company: string;
  country: "sa" | "ae" | "om" | "jo" | "other" | "";
  service: string;
  message: string;
  locale: string;
  source: string;
};

export type QuoteErrors = Partial<Record<"name" | "country" | "service" | "message", true>>;

export function validateQuote(q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (q.name.trim().length < 2) errors.name = true;
  if (!q.country) errors.country = true;
  if (!q.service) errors.service = true;
  if (q.message.trim().length < 20) errors.message = true;
  return errors;
}

/**
 * V1: no backend. Logs the payload and resolves. To go live, replace the body with a Supabase insert
 * (or a server action) and keep the same signature: `supabase.from("quote_requests").insert(q)`.
 */
export async function submitQuote(q: QuoteRequest): Promise<{ ok: true }> {
  console.info("[quote-request]", q);
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}

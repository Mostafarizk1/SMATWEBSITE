"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ease } from "@/lib/motion";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { submitQuote, validateQuote, type QuoteErrors, type QuoteField, type QuoteRequest } from "@/lib/quote";

type Option = { value: string; label: string };

export type QuoteFormLabels = {
  title: string;
  name: string;
  nameHint: string;
  company: string;
  companyHint: string;
  email: string;
  emailHint: string;
  phone: string;
  phoneHint: string;
  country: string;
  countryHint: string;
  service: string;
  serviceHint: string;
  message: string;
  messageHint: string;
  helper: string;
  optional: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  again: string;
  privacy: string;
  errors: Record<QuoteField, string>;
};

type Props = {
  labels: QuoteFormLabels;
  countries: Option[];
  services: Option[];
  locale: string;
};

const empty = (locale: string): QuoteRequest => ({
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  service: "",
  message: "",
  locale,
  source: "website-contact",
});

const field =
  "mt-2 block w-full min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-[#ff6b6b]";

// Which input to focus for each error, in form order. "contact" (no way to reply) points at the email field.
const focusOrder: [QuoteField, string][] = [
  ["name", "name"],
  ["contact", "email"],
  ["email", "email"],
  ["phone", "phone"],
  ["country", "country"],
  ["service", "service"],
  ["message", "message"],
];

export function QuoteForm(props: Props) {
  return (
    <MotionProvider>
      <Form {...props} />
    </MotionProvider>
  );
}

function Form({ labels, countries, services, locale }: Props) {
  const [values, setValues] = useState<QuoteRequest>(() => empty(locale));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched) setErrors(validateQuote(next));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validateQuote(values);
    setErrors(errs);
    const first = focusOrder.find(([key]) => errs[key]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first[1]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    await submitQuote(values);
    setStatus("done");
  };

  const err = (k: QuoteField) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-[#ff8a8a]">
        {labels.errors[k]}
      </p>
    ) : null;

  const a11y = (...keys: QuoteField[]) => {
    const active = keys.filter((k) => errors[k]);
    return {
      "aria-invalid": active.length ? true : undefined,
      "aria-describedby": active.length ? active.map((k) => `${k}-error`).join(" ") : undefined,
    };
  };

  const optional = <span className="text-muted">({labels.optional})</span>;

  return (
    <div className="relative rounded-3xl border border-line bg-bg p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <m.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex min-h-[28rem] flex-col items-start justify-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-accent text-on-accent">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12.5 10 17 19 7" />
              </svg>
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold">{labels.successTitle}</h2>
            <p className="mt-3 text-muted">{labels.successBody}</p>
            <button
              type="button"
              className="btn btn-ghost mt-8"
              onClick={() => {
                setValues(empty(locale));
                setErrors({});
                setTouched(false);
                setStatus("idle");
              }}
            >
              {labels.again}
            </button>
          </m.div>
        ) : (
          <m.form key="form" ref={formRef} noValidate onSubmit={onSubmit} aria-label={labels.title} exit={{ opacity: 0, y: -12 }} className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="q-name" className="text-sm font-medium">
                {labels.name}
              </label>
              <input
                id="q-name"
                name="name"
                autoComplete="name"
                required
                placeholder={labels.nameHint}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                className={field}
                {...a11y("name")}
              />
              {err("name")}
            </div>
            <div>
              <label htmlFor="q-company" className="text-sm font-medium">
                {labels.company} {optional}
              </label>
              <input
                id="q-company"
                name="company"
                autoComplete="organization"
                placeholder={labels.companyHint}
                value={values.company}
                onChange={(e) => update("company", e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="q-email" className="text-sm font-medium">
                {labels.email}
              </label>
              <input
                id="q-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                placeholder={labels.emailHint}
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                className={`${field} placeholder:text-start`}
                {...a11y("contact", "email")}
              />
              {err("email")}
              {err("contact")}
            </div>
            <div>
              <label htmlFor="q-phone" className="text-sm font-medium">
                {labels.phone}
              </label>
              <input
                id="q-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                placeholder={labels.phoneHint}
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={`${field} placeholder:text-start`}
                {...a11y("contact", "phone")}
              />
              {err("phone")}
            </div>
            <div>
              <label htmlFor="q-country" className="text-sm font-medium">
                {labels.country}
              </label>
              <select
                id="q-country"
                name="country"
                required
                value={values.country}
                onChange={(e) => update("country", e.target.value as QuoteRequest["country"])}
                className={field}
                {...a11y("country")}
              >
                <option value="">{labels.countryHint}</option>
                {countries.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {err("country")}
            </div>
            <div>
              <label htmlFor="q-service" className="text-sm font-medium">
                {labels.service}
              </label>
              <select id="q-service" name="service" required value={values.service} onChange={(e) => update("service", e.target.value)} className={field} {...a11y("service")}>
                <option value="">{labels.serviceHint}</option>
                {services.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {err("service")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="q-message" className="text-sm font-medium">
                {labels.message}
              </label>
              <textarea
                id="q-message"
                name="message"
                required
                rows={5}
                placeholder={labels.messageHint}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${field} resize-y`}
                {...a11y("message")}
              />
              {err("message")}
              <p className="mt-2 text-sm text-muted">{labels.helper}</p>
            </div>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">{labels.privacy}</p>
              <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
                {status === "sending" ? labels.sending : labels.submit}
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { inquiryOptions, siteConfig } from "@/data/site";
import { emptyInquiry, validateInquiry, type InquiryErrors, type InquiryPayload } from "@/lib/inquiry";

const serviceCategory: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  hospitality: "Hospitality",
};

function Field({
  id,
  label,
  error,
  children,
  optional = false,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.68rem] tracking-[0.16em] uppercase">
        {label}
        {optional ? (
          <span className="tracking-normal text-walnut normal-case"> — optional</span>
        ) : (
          <span className="text-walnut">
            {" "}
            *<span className="sr-only"> required</span>
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-walnut">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldClass = (invalid: boolean) =>
  `w-full border-b bg-transparent py-3 text-base text-charcoal transition-colors focus-visible:border-charcoal ${
    invalid ? "border-walnut" : "border-line"
  }`;

export function ConsultationForm({ deliveryConfigured }: { deliveryConfigured: boolean }) {
  const formId = useId();
  const params = useSearchParams();
  const requested = params.get("service") ?? "";
  const [values, setValues] = useState<InquiryPayload>(() => ({
    ...emptyInquiry(),
    category: serviceCategory[requested] ?? "",
  }));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<"sent" | "demo" | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function update<K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as keyof InquiryErrors];
      return next;
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    if (!deliveryConfigured) {
      setOutcome("demo");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, renderedAt: startedAt.current }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: InquiryErrors }
        | null;
      if (response.ok && data?.ok) {
        setOutcome("sent");
        return;
      }
      if (data?.errors) {
        setErrors(data.errors);
        const key = Object.keys(data.errors)[0];
        if (key) document.getElementById(`${formId}-${key}`)?.focus();
        return;
      }
      setFormError(data?.error || "The inquiry could not be sent. Your message was not sent.");
    } catch {
      setFormError("We could not reach the inquiry service. Your message was not sent.");
    } finally {
      setSubmitting(false);
    }
  }

  if (outcome) {
    const sent = outcome === "sent";
    return (
      <div role="status" className="border border-line px-6 py-14 md:px-10">
        <p className="eyebrow text-walnut">{sent ? "Inquiry sent" : "Demonstration"}</p>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">{sent ? "Thank you." : "Checked, and not sent."}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed">
          {sent
            ? "Your inquiry has been sent. The studio will reply using the details you provided."
            : "Your details were checked in the browser. This form is a demonstration until a delivery service is connected, so the inquiry was not sent to the studio."}
        </p>
        {!sent && (
          <button
            type="button"
            className="mt-8 min-h-11 text-[0.72rem] tracking-[0.16em] uppercase"
            onClick={() => setOutcome(null)}
          >
            Edit the inquiry
          </button>
        )}
      </div>
    );
  }

  const described = (name: keyof InquiryErrors) => (errors[name] ? `${formId}-${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="space-y-7">
      <p className="text-sm leading-relaxed text-walnut">Fields marked * are required.</p>
      {!deliveryConfigured && (
        <p className="border border-line px-4 py-4 text-sm leading-relaxed">
          {siteConfig.email
            ? `This form is a demonstration until a delivery service is connected. You can write to ${siteConfig.email}. Submitting it will not send your message.`
            : "This form is a demonstration until a delivery service is connected. Submitting it will not send your message."}
        </p>
      )}

      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.companyWebsite}
            onChange={(event) => update("companyWebsite", event.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <Field id={`${formId}-fullName`} label="Full name" error={errors.fullName}>
          <input
            id={`${formId}-fullName`}
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={described("fullName")}
            onChange={(event) => update("fullName", event.target.value)}
            className={fieldClass(Boolean(errors.fullName))}
          />
        </Field>

        <Field id={`${formId}-email`} label="Email" error={errors.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={described("email")}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass(Boolean(errors.email))}
          />
        </Field>

        <Field id={`${formId}-phone`} label="Telephone" error={errors.phone} optional>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={described("phone")}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass(Boolean(errors.phone))}
          />
        </Field>

        <Field id={`${formId}-category`} label="Project type" error={errors.category}>
          <select
            id={`${formId}-category`}
            name="category"
            value={values.category}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={described("category")}
            onChange={(event) => update("category", event.target.value)}
            className={fieldClass(Boolean(errors.category))}
          >
            <option value="">Select a type</option>
            {inquiryOptions.categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${formId}-location`} label="Project location" error={errors.location}>
          <input
            id={`${formId}-location`}
            name="location"
            autoComplete="address-level2"
            value={values.location}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={described("location")}
            onChange={(event) => update("location", event.target.value)}
            className={fieldClass(Boolean(errors.location))}
          />
        </Field>

        <Field id={`${formId}-size`} label="Approximate project size" optional>
          <select
            id={`${formId}-size`}
            name="size"
            value={values.size}
            onChange={(event) => update("size", event.target.value)}
            className={fieldClass(false)}
          >
            <option value="">Select a size</option>
            {inquiryOptions.sizes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${formId}-budget`} label="Estimated budget" optional>
          <select
            id={`${formId}-budget`}
            name="budget"
            value={values.budget}
            onChange={(event) => update("budget", event.target.value)}
            className={fieldClass(false)}
          >
            <option value="">Select a range</option>
            {inquiryOptions.budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${formId}-startDate`} label="Desired timeline" optional>
          <select
            id={`${formId}-startDate`}
            name="startDate"
            value={values.startDate}
            onChange={(event) => update("startDate", event.target.value)}
            className={fieldClass(false)}
          >
            <option value="">Select a timeline</option>
            {inquiryOptions.timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <p className="text-sm leading-relaxed text-walnut">
        Budget bands are provisional placeholders. Add a currency and replace the ranges in the site content before launch.
      </p>

      <Field id={`${formId}-description`} label="Project description" error={errors.description}>
        <textarea
          id={`${formId}-description`}
          name="description"
          rows={6}
          value={values.description}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={described("description")}
          onChange={(event) => update("description", event.target.value)}
          className={`${fieldClass(Boolean(errors.description))} resize-y`}
        />
      </Field>

      <Field id={`${formId}-contactMethod`} label="Preferred contact method" optional>
        <select
          id={`${formId}-contactMethod`}
          name="contactMethod"
          value={values.contactMethod}
          onChange={(event) => update("contactMethod", event.target.value)}
          className={fieldClass(false)}
        >
          <option value="">No preference yet</option>
          {inquiryOptions.contactMethods.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            checked={values.consent}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={described("consent")}
            onChange={(event) => update("consent", event.target.checked)}
            className="mt-1 size-4 accent-charcoal"
          />
          <label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed">
            I understand this inquiry is delivered only when the studio’s email service is connected, and that a
            demonstration submission is not sent.
            <span className="text-walnut">
              {" "}
              *<span className="sr-only"> required</span>
            </span>
          </label>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-walnut">
          Read the{" "}
          <Link href="/privacy" className="link-underline text-charcoal">
            privacy policy
          </Link>
          .
        </p>
        {errors.consent && (
          <p id={`${formId}-consent-error`} role="alert" className="mt-2 text-sm text-walnut">
            {errors.consent}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="border border-walnut px-4 py-3 text-sm leading-relaxed">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-11 items-center justify-center bg-charcoal px-6 py-3 text-[0.7rem] tracking-[0.18em] text-ivory uppercase transition-colors duration-300 hover:bg-walnut disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Submit project inquiry"}
      </button>
    </form>
  );
}

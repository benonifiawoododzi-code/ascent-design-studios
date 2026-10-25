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
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.68rem] tracking-[0.16em] uppercase">
        {label}
        {optional ? <span className="tracking-normal text-charcoal/60"> — optional</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-charcoal">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldClass = (invalid: boolean) =>
  `w-full border-b bg-transparent py-3 text-base outline-offset-4 ${invalid ? "border-charcoal" : "border-stone"}`;

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
  const [submitted, setSubmitted] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function update<K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
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
        setSubmitted(true);
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

  if (submitted) {
    return (
      <div role="status" className="border border-stone px-6 py-14 md:px-10">
        <h2 className="font-serif text-4xl md:text-5xl">Thank you.</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed">
          Your inquiry has been sent. The studio will reply using the details you provided.
        </p>
      </div>
    );
  }

  const described = (name: keyof InquiryErrors) => (errors[name] ? `${formId}-${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="space-y-7">
      {!deliveryConfigured && (
        <p className="border border-stone px-4 py-4 text-sm leading-relaxed">
          {siteConfig.email
            ? `This form is not connected to a delivery service yet. You can write to ${siteConfig.email}. Submitting the form now will not send your message.`
            : "This form is not connected to a delivery service yet. Submitting it will not send your message."}
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

      <Field id={`${formId}-email`} label="Email address" error={errors.email}>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={described("email")}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClass(Boolean(errors.email))}
        />
      </Field>

      <Field id={`${formId}-phone`} label="Phone number" error={errors.phone} optional>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={described("phone")}
          onChange={(event) => update("phone", event.target.value)}
          className={fieldClass(Boolean(errors.phone))}
        />
      </Field>

      <Field id={`${formId}-category`} label="Project category" error={errors.category}>
        <select
          id={`${formId}-category`}
          name="category"
          value={values.category}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={described("category")}
          onChange={(event) => update("category", event.target.value)}
          className={fieldClass(Boolean(errors.category))}
        >
          <option value="">Select a category</option>
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
        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
          Budget bands are provisional placeholders. Add a currency and replace the ranges in the site content before launch.
        </p>
      </Field>

      <Field id={`${formId}-startDate`} label="Expected start" optional>
        <input
          id={`${formId}-startDate`}
          name="startDate"
          type="month"
          value={values.startDate}
          onChange={(event) => update("startDate", event.target.value)}
          className={fieldClass(false)}
        />
      </Field>

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

      {formError && (
        <p role="alert" className="border border-charcoal px-4 py-3 text-sm leading-relaxed">
          {formError}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 items-center justify-center bg-charcoal px-6 py-3 text-[0.7rem] tracking-[0.18em] text-ivory uppercase disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Submit Project Inquiry"}
        </button>
        <p className="max-w-xs text-sm leading-relaxed text-charcoal/75">
          Details are handled as described in the{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

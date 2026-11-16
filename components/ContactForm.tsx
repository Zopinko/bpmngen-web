"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics-client";

type Field = "name" | "email" | "company" | "message" | "form";

export type ContactFormCopy = {
  name: string;
  email: string;
  company: string;
  optional: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  privacyNote: string;
  privacyLink: string;
  successTitle: string;
  successText: string;
  sendAnother: string;
  errors: Record<Field, string> & { rateLimited: string; network: string };
};

type ContactFormProps = {
  locale: "en" | "sk";
  copy: ContactFormCopy;
  privacyHref: string;
};

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; field: Field; text: string };

const inputClass =
  "block w-full rounded-[7px] border border-line-strong bg-input px-3 py-2 text-[14px] text-fg placeholder:text-[#5c5c66] transition hover:border-white/20 focus:border-accent/70 focus:outline-none focus:ring-[3px] focus:ring-accent/15";

export function ContactForm({ locale, copy, privacyHref }: ContactFormProps) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (response.ok) {
        form.reset();
        setStatus({ state: "sent" });
        void trackEvent("contact_submitted");
        return;
      }
      if (response.status === 429) {
        setStatus({ state: "error", field: "form", text: copy.errors.rateLimited });
        return;
      }
      const body = (await response.json().catch(() => ({}))) as { field?: Field };
      const field = body.field && body.field in copy.errors ? body.field : "form";
      setStatus({ state: "error", field, text: copy.errors[field] });
    } catch {
      setStatus({ state: "error", field: "form", text: copy.errors.network });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="rounded-xl border border-success/30 bg-success/[0.07] p-6">
        <p className="flex items-center gap-2 text-[15px] font-semibold text-fg">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          {copy.successTitle}
        </p>
        <p className="mt-2 text-[14px] leading-6 text-fg-2">{copy.successText}</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="btn btn-sm mt-5">
          {copy.sendAnother}
        </button>
      </div>
    );
  }

  const errorFor = (field: Field) => (status.state === "error" && status.field === field ? status.text : null);
  const fieldError = (field: Field) => {
    const text = errorFor(field);
    return text ? (
      <p id={`${field}-error`} className="mt-1.5 text-[12.5px] text-[#ff8c90]">
        {text}
      </p>
    ) : null;
  };
  const describedBy = (field: Field) => (errorFor(field) ? `${field}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-medium text-fg-2">
            {copy.name}
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[13px] font-medium text-fg-2">
            {copy.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClass}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-[13px] font-medium text-fg-2">
          {copy.company} <span className="font-normal text-fg-3">({copy.optional})</span>
        </label>
        <input
          id="contact-company"
          name="company"
          maxLength={150}
          autoComplete="organization"
          className={inputClass}
          aria-invalid={Boolean(errorFor("company"))}
          aria-describedby={describedBy("company")}
        />
        {fieldError("company")}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-[13px] font-medium text-fg-2">
          {copy.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          placeholder={copy.messagePlaceholder}
          className={`${inputClass} resize-y`}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={describedBy("message")}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot for bots: hidden from people and from assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {errorFor("form") ? (
        <p role="alert" className="rounded-[7px] border border-danger/35 bg-danger/10 px-3 py-2 text-[13px] text-[#ffb1b4]">
          {errorFor("form")}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-5 text-fg-3">
          {copy.privacyNote}{" "}
          <a href={privacyHref} className="text-accent-text underline-offset-2 hover:underline">
            {copy.privacyLink}
          </a>
          .
        </p>
        <button type="submit" disabled={status.state === "sending"} className="btn btn-primary btn-lg disabled:opacity-60">
          {status.state === "sending" ? copy.sending : copy.submit}
        </button>
      </div>
    </form>
  );
}

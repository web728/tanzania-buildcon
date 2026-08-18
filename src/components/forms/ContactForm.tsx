"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactEnquirySchema, type ContactEnquiryInput, contactInterestOptions } from "@/lib/validation/contactEnquiry";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

export function ContactForm({ defaultInterest }: { defaultInterest?: (typeof contactInterestOptions)[number] }) {
  const [startedAt] = useState(() => Date.now());
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: defaultInterest ? { interest: defaultInterest } : undefined,
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Enquiry Received"
        message="Thank you for contacting Tanzania Buildcon International Expo. Our team will respond to your enquiry shortly."
        referenceId={referenceId}
      />
    );
  }

  const onSubmit = (data: ContactEnquiryInput) => {
    submit({ ...data, startedAt, utm: getUtmFromLocation(), landingPage: window.location.pathname });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="c-website_hp">Website</label>
        <input id="c-website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Name" htmlFor="name" required error={errors.name}>
          <input id="name" className={inputClasses(!!errors.name)} {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Company" htmlFor="company" required error={errors.company}>
          <input id="company" className={inputClasses(!!errors.company)} {...register("company")} />
        </FieldWrapper>
        <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
          <select id="country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
            <option value="" disabled>Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Email" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" className={inputClasses(!!errors.email)} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Mobile / WhatsApp" htmlFor="mobile" required error={errors.mobile}>
          <input id="mobile" type="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
        </FieldWrapper>
        <FieldWrapper label="Interest" htmlFor="interest" required error={errors.interest}>
          <select id="interest" className={inputClasses(!!errors.interest)} {...register("interest")} defaultValue={defaultInterest ?? ""}>
            <option value="" disabled>Select an option</option>
            {contactInterestOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Message" htmlFor="message" required error={errors.message} className="sm:col-span-2">
          <textarea id="message" rows={4} className={inputClasses(!!errors.message)} {...register("message")} />
        </FieldWrapper>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-brand-body">
          <input type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-brand-border" {...register("consent")} />
          <span>
            I agree that Tanzania Buildcon International Expo may contact me regarding my enquiry,
            in line with the <a href="/privacy-policy" className="underline hover:text-brand-blue">Privacy Policy</a>.
          </span>
        </label>
        {errors.consent ? <p className="mt-1.5 opacity-100 text-xs font-medium text-red-600 transition-opacity duration-150 ease-out starting:opacity-0">{errors.consent.message}</p> : null}
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" className="translate-y-0 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 opacity-100 transition-[transform,opacity] duration-200 ease-out starting:translate-y-1 starting:opacity-0">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-blue px-7 py-3.5 text-base font-semibold uppercase tracking-wide text-white transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] disabled:active:scale-100 hover:bg-brand-blue-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Send Message"}
      </button>
    </form>
  );
}

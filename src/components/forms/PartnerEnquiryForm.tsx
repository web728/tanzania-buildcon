"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { partnerEnquirySchema, type PartnerEnquiryInput } from "@/lib/validation/partnerEnquiry";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

export function PartnerEnquiryForm() {
  const [startedAt] = useState(() => Date.now());
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/partner-enquiry");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerEnquiryInput>({
    resolver: zodResolver(partnerEnquirySchema),
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Partnership Enquiry Received"
        message="Thank you for your interest in partnering with Tanzania Buildcon International Expo. Our team will review your enquiry and respond shortly."
        referenceId={referenceId}
      />
    );
  }

  const onSubmit = (data: PartnerEnquiryInput) => {
    submit({ ...data, startedAt, utm: getUtmFromLocation(), landingPage: window.location.pathname });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="p-website_hp">Website</label>
        <input id="p-website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Organisation" htmlFor="organisation" required error={errors.organisation}>
          <input id="organisation" className={inputClasses(!!errors.organisation)} {...register("organisation")} />
        </FieldWrapper>
        <FieldWrapper label="Organisation Type" htmlFor="organisationType" required error={errors.organisationType}>
          <input id="organisationType" className={inputClasses(!!errors.organisationType)} {...register("organisationType")} />
        </FieldWrapper>
        <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
          <select id="country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
            <option value="" disabled>Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Website" htmlFor="website" error={errors.website}>
          <input id="website" placeholder="https://" className={inputClasses(!!errors.website)} {...register("website")} />
        </FieldWrapper>
        <FieldWrapper label="Contact Person" htmlFor="contactPerson" required error={errors.contactPerson}>
          <input id="contactPerson" className={inputClasses(!!errors.contactPerson)} {...register("contactPerson")} />
        </FieldWrapper>
        <FieldWrapper label="Designation" htmlFor="designation" error={errors.designation}>
          <input id="designation" className={inputClasses(!!errors.designation)} {...register("designation")} />
        </FieldWrapper>
        <FieldWrapper label="Email" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" className={inputClasses(!!errors.email)} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Phone" htmlFor="phone" required error={errors.phone}>
          <input id="phone" type="tel" className={inputClasses(!!errors.phone)} {...register("phone")} />
        </FieldWrapper>
        <FieldWrapper label="Approximate Membership" htmlFor="approximateMembership" error={errors.approximateMembership}>
          <input id="approximateMembership" className={inputClasses()} {...register("approximateMembership")} />
        </FieldWrapper>
        <FieldWrapper label="Industry Represented" htmlFor="industryRepresented" error={errors.industryRepresented}>
          <input id="industryRepresented" className={inputClasses()} {...register("industryRepresented")} />
        </FieldWrapper>
        <FieldWrapper label="Nature of Enquiry" htmlFor="natureOfEnquiry" required error={errors.natureOfEnquiry} className="sm:col-span-2">
          <input id="natureOfEnquiry" className={inputClasses(!!errors.natureOfEnquiry)} {...register("natureOfEnquiry")} />
        </FieldWrapper>
        <FieldWrapper label="Message" htmlFor="message" error={errors.message} className="sm:col-span-2">
          <textarea id="message" rows={3} className={inputClasses()} {...register("message")} />
        </FieldWrapper>
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" className="translate-y-0 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 opacity-100 transition-[transform,opacity] duration-200 ease-out starting:translate-y-1 starting:opacity-0">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-blue px-7 py-3.5 text-base font-semibold uppercase tracking-wide text-white transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] disabled:active:scale-100 hover:bg-brand-blue-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Partnership Enquiry"}
      </button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  exhibitorEnquirySchema,
  type ExhibitorEnquiryInput,
  companyTypeOptions,
  participationOptions,
  areaOptions,
  yesNoOptions,
  yesNoMaybeOptions,
} from "@/lib/validation/exhibitorEnquiry";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

export function BookStandForm() {
  const [startedAt] = useState(() => Date.now());
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/exhibitor-enquiry");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExhibitorEnquiryInput>({
    resolver: zodResolver(exhibitorEnquirySchema),
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Exhibitor Enquiry Received"
        message="Thank you for your interest in exhibiting at Tanzania Buildcon International Expo. Our exhibition sales team will contact you shortly with participation details."
        referenceId={referenceId}
      />
    );
  }

  const onSubmit = (data: ExhibitorEnquiryInput) => {
    submit({ ...data, startedAt, utm: getUtmFromLocation(), landingPage: window.location.pathname });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Website</label>
        <input id="website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Company</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Company Name" htmlFor="companyName" required error={errors.companyName}>
            <input id="companyName" className={inputClasses(!!errors.companyName)} {...register("companyName")} />
          </FieldWrapper>
          <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
            <select id="country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
              <option value="" disabled>Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FieldWrapper>
          <FieldWrapper label="City" htmlFor="city" error={errors.city}>
            <input id="city" className={inputClasses(!!errors.city)} {...register("city")} />
          </FieldWrapper>
          <FieldWrapper label="Website" htmlFor="website" error={errors.website}>
            <input id="website" placeholder="https://" className={inputClasses(!!errors.website)} {...register("website")} />
          </FieldWrapper>
          <FieldWrapper label="Company Type" htmlFor="companyType" required error={errors.companyType} className="sm:col-span-2">
            <select id="companyType" className={inputClasses(!!errors.companyType)} {...register("companyType")} defaultValue="">
              <option value="" disabled>Select company type</option>
              {companyTypeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Contact</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="First Name" htmlFor="firstName" required error={errors.firstName}>
            <input id="firstName" className={inputClasses(!!errors.firstName)} {...register("firstName")} />
          </FieldWrapper>
          <FieldWrapper label="Last Name" htmlFor="lastName" required error={errors.lastName}>
            <input id="lastName" className={inputClasses(!!errors.lastName)} {...register("lastName")} />
          </FieldWrapper>
          <FieldWrapper label="Designation" htmlFor="designation" required error={errors.designation}>
            <input id="designation" className={inputClasses(!!errors.designation)} {...register("designation")} />
          </FieldWrapper>
          <FieldWrapper label="Business Email" htmlFor="email" required error={errors.email}>
            <input id="email" type="email" className={inputClasses(!!errors.email)} {...register("email")} />
          </FieldWrapper>
          <FieldWrapper label="Mobile / WhatsApp" htmlFor="mobile" required error={errors.mobile} className="sm:col-span-2">
            <input id="mobile" type="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
          </FieldWrapper>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Participation</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Product Category" htmlFor="productCategory" required error={errors.productCategory}>
            <select id="productCategory" className={inputClasses(!!errors.productCategory)} {...register("productCategory")} defaultValue="">
              <option value="" disabled>Select category</option>
              {exhibitionSectors.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
            </select>
          </FieldWrapper>
          <FieldWrapper label="Preferred Participation" htmlFor="preferredParticipation" required error={errors.preferredParticipation}>
            <select id="preferredParticipation" className={inputClasses(!!errors.preferredParticipation)} {...register("preferredParticipation")} defaultValue="">
              <option value="" disabled>Select an option</option>
              {participationOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
          <FieldWrapper label="Products / Services" htmlFor="productsServices" required error={errors.productsServices} className="sm:col-span-2">
            <textarea id="productsServices" rows={3} className={inputClasses(!!errors.productsServices)} {...register("productsServices")} />
          </FieldWrapper>
          <FieldWrapper label="Required Area" htmlFor="requiredArea" required error={errors.requiredArea}>
            <select id="requiredArea" className={inputClasses(!!errors.requiredArea)} {...register("requiredArea")} defaultValue="">
              <option value="" disabled>Select area</option>
              {areaOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
          <div />
          <FieldWrapper label="Existing business in Tanzania?" htmlFor="existingBusinessInTanzania" error={errors.existingBusinessInTanzania}>
            <select id="existingBusinessInTanzania" className={inputClasses()} {...register("existingBusinessInTanzania")} defaultValue="">
              <option value="">Select</option>
              {yesNoOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
          <FieldWrapper label="Looking for a distributor in Tanzania?" htmlFor="lookingForDistributor" error={errors.lookingForDistributor}>
            <select id="lookingForDistributor" className={inputClasses()} {...register("lookingForDistributor")} defaultValue="">
              <option value="">Select</option>
              {yesNoMaybeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
          <FieldWrapper label="Message / Requirements" htmlFor="message" error={errors.message} className="sm:col-span-2">
            <textarea id="message" rows={3} className={inputClasses()} {...register("message")} />
          </FieldWrapper>
        </div>
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-sm text-brand-body">
          <input type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-brand-border" {...register("consent")} />
          <span>
            I agree that Tanzania Buildcon International Expo may contact me regarding my exhibitor
            enquiry, in line with the{" "}
            <a href="/privacy-policy" className="underline hover:text-brand-blue">Privacy Policy</a>.
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
        {status === "submitting" ? "Submitting…" : "Submit Exhibitor Enquiry"}
      </button>
    </form>
  );
}

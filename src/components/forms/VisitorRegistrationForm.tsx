"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  visitorRegistrationSchema,
  type VisitorRegistrationInput,
  purchasingResponsibilityOptions,
  purposeOfVisitOptions,
  natureOfBusinessOptions,
} from "@/lib/validation/visitorRegistration";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

export function VisitorRegistrationForm() {
  const [startedAt] = useState(() => Date.now());
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/visitor-registration");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VisitorRegistrationInput>({
    resolver: zodResolver(visitorRegistrationSchema),
    defaultValues: { productsInterested: [] },
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Visitor Registration Received"
        message="Thank you for registering to visit Tanzania Buildcon International Expo. Please keep this reference for your records."
        referenceId={referenceId}
      />
    );
  }

  const onSubmit = (data: VisitorRegistrationInput) => {
    submit({ ...data, startedAt, utm: getUtmFromLocation(), landingPage: window.location.pathname });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Website</label>
        <input id="website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="First Name" htmlFor="firstName" required error={errors.firstName}>
          <input id="firstName" className={inputClasses(!!errors.firstName)} {...register("firstName")} />
        </FieldWrapper>
        <FieldWrapper label="Last Name" htmlFor="lastName" required error={errors.lastName}>
          <input id="lastName" className={inputClasses(!!errors.lastName)} {...register("lastName")} />
        </FieldWrapper>
        <FieldWrapper label="Designation" htmlFor="designation" required error={errors.designation}>
          <input id="designation" className={inputClasses(!!errors.designation)} {...register("designation")} />
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
        <FieldWrapper label="City" htmlFor="city" required error={errors.city}>
          <input id="city" className={inputClasses(!!errors.city)} {...register("city")} />
        </FieldWrapper>
        <FieldWrapper label="Business Email" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" className={inputClasses(!!errors.email)} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Mobile / WhatsApp" htmlFor="mobile" required error={errors.mobile}>
          <input id="mobile" type="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
        </FieldWrapper>
        <FieldWrapper label="Nature of Business" htmlFor="natureOfBusiness" required error={errors.natureOfBusiness} className="sm:col-span-2">
          <select id="natureOfBusiness" className={inputClasses(!!errors.natureOfBusiness)} {...register("natureOfBusiness")} defaultValue="">
            <option value="" disabled>Select an option</option>
            {natureOfBusinessOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-brand-dark">
          Products Interested In <span className="text-brand-blue">*</span>
        </p>
        <Controller
          name="productsInterested"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {exhibitionSectors.map((sector) => {
                const checked = field.value?.includes(sector.name);
                return (
                  <label
                    key={sector.slug}
                    className="flex items-center gap-2.5 rounded-md border border-brand-border px-3 py-2.5 text-sm text-brand-body has-checked:border-brand-blue has-checked:bg-brand-blue/5 has-checked:text-brand-dark"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-brand-border"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...(field.value ?? []), sector.name]
                          : (field.value ?? []).filter((v) => v !== sector.name);
                        field.onChange(next);
                      }}
                    />
                    {sector.name}
                  </label>
                );
              })}
            </div>
          )}
        />
        {errors.productsInterested ? (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.productsInterested.message}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Purchasing Responsibility" htmlFor="purchasingResponsibility" required error={errors.purchasingResponsibility}>
          <select id="purchasingResponsibility" className={inputClasses(!!errors.purchasingResponsibility)} {...register("purchasingResponsibility")} defaultValue="">
            <option value="" disabled>Select an option</option>
            {purchasingResponsibilityOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Purpose of Visit" htmlFor="purposeOfVisit" required error={errors.purposeOfVisit}>
          <select id="purposeOfVisit" className={inputClasses(!!errors.purposeOfVisit)} {...register("purposeOfVisit")} defaultValue="">
            <option value="" disabled>Select an option</option>
            {purposeOfVisitOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-brand-body">
          <input type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-brand-border" {...register("consent")} />
          <span>
            I agree that Tanzania Buildcon International Expo may contact me regarding my visitor
            registration, in line with the{" "}
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
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-green px-7 py-3.5 text-base font-semibold uppercase tracking-wide text-white transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] disabled:active:scale-100 hover:bg-brand-green-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Register to Visit"}
      </button>
    </form>
  );
}

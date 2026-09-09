"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const CONTACT_PERSONS = [
  {
    role: "Exhibition & Stand Enquiries",
    person: event.contact.exhibitorEnquiries,
    tag: "Futurex Trade Fair",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    role: "International Participation",
    person: event.contact.internationalParticipation,
    tag: "ETSIPL Global Desk",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    role: "Trade Visitor & Delegation Desk",
    person: event.contact.visitorEnquiries,
    tag: "Visitor Facilitation",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export function ContactClientView() {
  return (
    <div className="relative overflow-hidden bg-slate-50/50 py-16 sm:py-24 text-brand-dark selection:bg-brand-blue selection:text-white">
      {/* Background Architectural Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-page-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0b1720" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-page-grid)" />
        </svg>
      </div>

      {/* Ambient Gradient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 -z-10 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />

      <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-10 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-blue">
                Official Organizing Committee
              </span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] text-brand-dark">
              Connect with Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-500 to-brand-green">
                Secretariat Team
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              For stand reservations, technical specifications, bilateral trade delegation hosting, or general show enquiries.
            </p>
          </div>

          {/* Schedule Badge Card */}
          <div className="shrink-0 rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-sm backdrop-blur-md text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Event Schedule
            </span>
            <span className="mt-1 text-sm sm:text-base font-extrabold text-brand-dark block">
              {event.dates.display}
            </span>
            <span className="mt-0.5 text-xs text-slate-500 font-medium block">
              {event.venue.fullLocation}
            </span>
          </div>
        </div>

        {/* Section 1: Direct Communication Desks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {CONTACT_PERSONS.map((item, idx) => {
            const cleanPhone = item.person.phone.replace(/[^0-9+]/g, "");
            const isBlue = idx === 0;

            return (
              <motion.div
                key={item.role}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isBlue
                          ? "bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-blue/20"
                          : "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-green/20"
                      }`}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                      </svg>
                    </div>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {item.tag}
                    </span>
                  </div>

                  <span className="mt-6 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {item.role}
                  </span>

                  <h3 className="mt-1 text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">
                    {item.person.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    {item.person.label}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col gap-3 text-xs">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center gap-2.5 font-semibold text-slate-700 transition-colors hover:text-brand-green"
                  >
                    <svg className="h-4 w-4 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {item.person.phone}
                  </a>

                  <a
                    href={`mailto:${item.person.email}`}
                    className="inline-flex items-center gap-2.5 font-semibold text-slate-700 transition-colors hover:text-brand-blue truncate"
                  >
                    <svg className="h-4 w-4 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {item.person.email}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section 2: Contact Form Glass Container */}
        <div className="mt-16 sm:mt-20 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto">
          <div className="text-center pb-8 border-b border-slate-100 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-blue">
              Electronic Dispatch
            </span>
            <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-dark">
              Send Us a Message
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Complete the enquiry form below. Your request will be directed to the corresponding department head immediately.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        {/* Bottom Booking Action Ribbon */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue/[0.05] via-white to-brand-green/[0.05] p-7 shadow-lg shadow-brand-blue/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green shadow-inner">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-brand-dark">
                Planning to participate as an exhibitor or trade delegate?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Held from {event.dates.display} at {event.venue.name}, {event.venue.city}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href={event.cta.bookStand}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand-blue/20 hover:bg-brand-blue-dark hover:shadow-lg transition-all duration-200"
            >
              Book Stand Space
            </Link>
            <Link
              href={event.cta.registerVisit}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:border-brand-blue hover:text-brand-blue hover:bg-slate-50 transition-all duration-200"
            >
              Visitor Pass
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
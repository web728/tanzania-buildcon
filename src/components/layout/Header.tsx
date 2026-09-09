"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { clsx } from "@/lib/utils/clsx";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileOpen) return;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6) {
        setIsVisible(false);
        setOpenDropdown(null);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenDropdown(null);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleKeyDown]);

  const marqueeItems = [
    { label: "DATE", value: event.dates?.display || "2027 Edition" },
    { label: "VENUE", value: event.venue?.name || "Diamond Jubilee Hall" },
    { label: "LOCATION", value: `${event.venue?.city || "Dar es Salaam"}, ${event.venue?.country || "Tanzania"}` },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "translate-y-0" : "-translate-y-full shadow-none"
      )}
    >
      {/* Top Announcement Bar */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[#030712]/90 backdrop-blur-md py-2.5 text-white select-none">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-green/10 opacity-50" />

        <div className="relative flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee items-center gap-8 shrink-0">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <div key={index} className="inline-flex items-center gap-2 text-[15px] font-medium tracking-wide">
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase tracking-widest text-brand-blue">
                  {item.label}
                </span>
                <span className="text-slate-200">{item.value}</span>
                <span className="text-white/20 ml-4">&bull;</span>
              </div>
            ))}
          </div>

          <div className="flex animate-marquee items-center gap-8 shrink-0" aria-hidden="true">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <div key={`dup-${index}`} className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wide">
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase tracking-widest text-brand-blue">
                  {item.label}
                </span>
                <span className="text-slate-200">{item.value}</span>
                <span className="text-white/20 ml-4">&bull;</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Area */}
      <div
        className={clsx(
          "w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "border-b border-white/10 bg-[#071118]/85 py-2.5 backdrop-blur-2xl shadow-2xl shadow-black/40"
            : "border-b border-white/10 bg-transparent py-4 sm:py-5 backdrop-blur-sm"
        )}
      >
        <Container className="flex items-center justify-between gap-2 lg:gap-4 max-w-7xl">
          {/* Brand Logo Container (Unchanged Size) */}
          <div className="flex shrink-0 items-center justify-start">
            <Link
              href="/"
              className="group relative z-10 -ml-1 flex items-center transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:-ml-2"
            >
              <Image
                src="/logos/Tanzania-Logo.png"
                alt={event.name}
                width={560}
                height={200}
                priority
                className="h-16 w-auto object-contain object-left drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 sm:h-20 md:h-24 lg:h-28"
              />
            </Link>
          </div>

          {/* Desktop Floating Pill Navigation */}
          <nav
            aria-label="Primary Navigation"
            ref={navRef}
            className="hidden items-center justify-center lg:flex"
          >
            <ul className="flex items-center gap-0.5 xl:gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1.5 backdrop-blur-2xl shadow-lg shadow-black/20 transition-colors duration-300 hover:border-white/25">
              {mainNav.map((item) => {
                const isActive =
                  pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const hasChildren = Boolean(item.children?.length);
                const isDropdownOpen = openDropdown === item.label;

                return (
                  <li
                    key={item.href}
                    className="group relative shrink-0"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={clsx(
                        "relative flex items-center gap-1 rounded-full px-2.5 xl:px-3.5 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 xl:text-[13px]",
                        isActive
                          ? "bg-white/20 text-white shadow-inner shadow-white/20"
                          : "text-slate-200 hover:bg-white/10 hover:text-white",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                      )}
                      aria-expanded={hasChildren ? isDropdownOpen : undefined}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>

                      {hasChildren && (
                        <svg
                          className={clsx(
                            "h-3 w-3 shrink-0 transition-transform duration-300 opacity-70 group-hover:opacity-100",
                            isDropdownOpen && "rotate-180 text-brand-blue opacity-100"
                          )}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 4.5L6 8L9.5 4.5"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown Panel */}
                    {hasChildren && (
                      <div
                        className={clsx(
                          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isDropdownOpen
                            ? "pointer-events-auto visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-3 opacity-0"
                        )}
                      >
                        <div className="w-64 overflow-hidden rounded-2xl border border-white/15 bg-[#071118]/95 p-2 shadow-2xl backdrop-blur-2xl">
                          {item.children?.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={clsx(
                                  "group/child flex flex-col rounded-xl p-2.5 transition-all duration-200",
                                  isChildActive
                                    ? "bg-brand-blue/20 text-white"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                                )}
                              >
                                <span
                                  className={clsx(
                                    "text-xs font-semibold tracking-wide transition-colors duration-200 group-hover/child:text-brand-blue",
                                    isChildActive ? "text-brand-blue" : "text-slate-100"
                                  )}
                                >
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400 group-hover/child:text-slate-300">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="hidden shrink-0 items-center justify-end gap-2 xl:gap-3 lg:flex">
            <Button
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-blue to-sky-500 px-4 xl:px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(2,163,220,0.35)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(2,163,220,0.6)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Book a Stand
            </Button>
            <Button
              href={event.cta.registerVisit}
              variant="secondary"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 xl:px-6 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-brand-green/60 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Register to Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-blue lg:hidden"
          >
            <div className="relative h-3.5 w-4.5">
              <span
                className={clsx(
                  "absolute left-0 top-0 h-0.5 w-4.5 rounded-full bg-white transition-all duration-300",
                  mobileOpen && "top-1.5 rotate-45"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-0.5 w-4.5 rounded-full bg-white transition-all duration-200",
                  mobileOpen && "translate-x-1 opacity-0"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-3 h-0.5 w-4.5 rounded-full bg-white transition-all duration-300",
                  mobileOpen && "top-1.5 -rotate-45"
                )}
              />
            </div>
          </button>
        </Container>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
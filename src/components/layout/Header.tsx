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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close menus cleanly on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Handle scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
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

  // Close dropdown on Escape key or outside click
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenDropdown(null);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/85"
          : "border-b border-transparent bg-white dark:bg-slate-900"
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-3 transition-all duration-300 lg:py-0">
        {/* Brand Logo */}
        <Link
          href="/"
          className="relative z-10 flex flex-shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
        >
          <div
            className={clsx(
              "relative transition-all duration-300",
              scrolled ? "h-8 w-44 sm:h-9 sm:w-52" : "h-10 w-52 sm:h-12 sm:w-64"
            )}
          >
            <Image
              src="/logos/tanzania-buildcon-logo.png"
              alt={event.name}
              fill
              sizes="(max-width: 768px) 200px, 280px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary Navigation" ref={navRef} className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const hasChildren = Boolean(item.children?.length);
              const isDropdownOpen = openDropdown === item.label;

              return (
                <li
                  key={item.href}
                  className="group relative py-5"
                  onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={clsx(
                        "relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-brand-blue font-semibold"
                          : "text-slate-700 hover:text-brand-blue dark:text-slate-200 dark:hover:text-brand-blue",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                      )}
                      aria-expanded={hasChildren ? isDropdownOpen : undefined}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleDropdown(item.label);
                          }}
                          className="p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <svg
                            className={clsx(
                              "h-3.5 w-3.5 opacity-70 transition-transform duration-200",
                              isDropdownOpen && "rotate-180"
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
                        </button>
                      )}
                      
                      {/* Active / Hover Indicator */}
                      <span
                        className={clsx(
                          "absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-blue transition-all duration-300",
                          isActive ? "opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                        )}
                      />
                    </Link>
                  </div>

                  {/* Dropdown Submenu */}
                  {hasChildren && (
                    <div
                      className={clsx(
                        "absolute left-0 top-full pt-1 transition-all duration-200 ease-out z-50",
                        isDropdownOpen
                          ? "pointer-events-auto visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible translate-y-2 opacity-0"
                      )}
                    >
                      <div className="w-72 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={clsx(
                                "group/child flex flex-col rounded-xl p-3 transition-all duration-150",
                                isChildActive
                                  ? "bg-brand-blue/10 text-brand-blue"
                                  : "hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                              )}
                            >
                              <span
                                className={clsx(
                                  "text-sm font-medium transition-colors group-hover/child:text-brand-blue",
                                  isChildActive ? "text-brand-blue font-semibold" : "text-slate-800 dark:text-slate-200"
                                )}
                              >
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
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

        {/* CTA Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href={event.cta.bookStand}
            variant="primary"
            size="md"
            className="shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            Book a Stand
          </Button>
          <Button
            href={event.cta.registerVisit}
            variant="secondary"
            size="md"
            className="shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            Register to Visit
          </Button>
        </div>

        {/* Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-blue lg:hidden dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="relative h-4 w-5">
            <span
              className={clsx(
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 dark:bg-slate-100",
                mobileOpen && "top-2 rotate-45"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200 dark:bg-slate-100",
                mobileOpen && "opacity-0 translate-x-2"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 dark:bg-slate-100",
                mobileOpen && "top-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Drawer Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
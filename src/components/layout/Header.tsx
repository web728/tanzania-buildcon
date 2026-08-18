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
  const navRef = useRef<HTMLElement>(null);
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
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 py-2"
          : "border-b border-transparent bg-white py-3 sm:py-4 dark:bg-slate-900"
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Brand Logo - Responsive sizing without layout shift */}
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <div className="relative h-16 w-32 sm:h-11 sm:w-44 lg:h-22 lg:w-48 xl:h-14 xl:w-56 transition-all duration-300">
            <Image
              src="/logos/Tanzania-Logo.png"
              alt={event.name}
              fill
              sizes="(max-width: 740px) 148px, (max-width: 1024px) 176px, 224px"
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
                  className="group relative"
                  onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={clsx(
                        "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 xl:px-4 xl:text-sm",
                        isActive
                          ? "text-brand-blue font-semibold"
                          : "text-slate-700 hover:text-brand-blue dark:text-slate-200 dark:hover:text-brand-blue",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                      )}
                      aria-expanded={hasChildren ? isDropdownOpen : undefined}
                    >
                      <span>{item.label}</span>

                      {/* Dropdown Indicator Icon */}
                      {hasChildren && (
                        <svg
                          className={clsx(
                            "h-3 w-3 transition-transform duration-200 opacity-70 group-hover:opacity-100",
                            isDropdownOpen && "rotate-180 text-brand-blue"
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

                      {/* Active Indicator Bar */}
                      <span
                        className={clsx(
                          "absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-blue transition-all duration-300",
                          isActive
                            ? "opacity-100"
                            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                        )}
                      />
                    </Link>
                  </div>

                  {/* Dropdown Submenu */}
                  {hasChildren && (
                    <div
                      className={clsx(
                        "absolute left-0 top-full pt-2 transition-all duration-200 ease-out z-50",
                        isDropdownOpen
                          ? "pointer-events-auto visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible translate-y-2 opacity-0"
                      )}
                    >
                      <div className="w-60 xl:w-68 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={clsx(
                                "group/child flex flex-col rounded-xl p-2.5 transition-all duration-150",
                                isChildActive
                                  ? "bg-brand-blue/10 text-brand-blue"
                                  : "hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                              )}
                            >
                              <span
                                className={clsx(
                                  "text-xs xl:text-sm font-medium transition-colors group-hover/child:text-brand-blue",
                                  isChildActive ? "text-brand-blue font-semibold" : "text-slate-800 dark:text-slate-200"
                                )}
                              >
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 text-[11px] text-slate-500 line-clamp-2 dark:text-slate-400">
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

     {/* Action Buttons - Visible on Desktop (`lg:` and up) */}
<div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
  <Button
    href={event.cta.bookStand}
    variant="primary"
    size="md"
    className="shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-xs xl:text-sm px-3 xl:px-4 py-1.5"
  >
    Book a Stand
  </Button>
  <Button
    href={event.cta.registerVisit}
    variant="secondary"
    size="md"
    className="shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-xs xl:text-sm px-3 xl:px-4 py-1.5"
  >
    Register to Visit
  </Button>
</div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-blue lg:hidden dark:border-slate-800 dark:bg-slate-900"
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
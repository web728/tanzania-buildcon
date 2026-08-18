"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/utils/clsx";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Route change par drawer close ho jayega
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // ESC key press Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {/* Semi-transparent Overlay Background */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Drawer Menu (Full height slide-over panel) */}
      <div
        id="mobile-menu"
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        {/* Top Header inside Drawer */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Navigation Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {mainNav.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const isExpanded = expanded === item.href;
                const hasChildren = Boolean(item.children?.length);

                return (
                  <li key={item.href} className="py-2">
                    {hasChildren ? (
                      <div>
                        <div className="flex items-center justify-between py-1.5">
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={clsx(
                              "text-base font-semibold transition-colors",
                              isActive
                                ? "text-brand-blue font-bold"
                                : "text-slate-800 dark:text-slate-100 hover:text-brand-blue"
                            )}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-expanded={isExpanded}
                            aria-controls={`submenu-${item.href}`}
                            onClick={() => setExpanded((e) => (e === item.href ? null : item.href))}
                            aria-label={`Toggle ${item.label} submenu`}
                          >
                            <svg
                              className={clsx("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180 text-brand-blue")}
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path d="M2.5 4.5L6 8L9.5 4.5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>

                        {/* Accordion Submenu */}
                        <div
                          id={`submenu-${item.href}`}
                          className={clsx(
                            "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out",
                            isExpanded ? "grid-rows-[1fr] pt-1 pb-2" : "grid-rows-[0fr]"
                          )}
                        >
                          <div className="min-h-0">
                            <ul className="flex flex-col gap-1 pl-3 border-l-2 border-slate-200 dark:border-slate-800 ml-1">
                              {item.children?.map((child) => {
                                const isChildActive = pathname === child.href;
                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className={clsx(
                                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                                        isChildActive
                                          ? "bg-brand-blue/10 text-brand-blue font-semibold"
                                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-blue"
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={clsx(
                          "block py-2 text-base font-semibold transition-colors",
                          isActive
                            ? "text-brand-blue font-bold"
                            : "text-slate-800 dark:text-slate-100 hover:text-brand-blue"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-6 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3">
          <Button
            href={event.cta.bookStand}
            variant="primary"
            size="md"
            className="w-full justify-center shadow-md active:scale-[0.98] transition-transform text-sm py-2.5"
          >
            Book a Stand
          </Button>
          <Button
            href={event.cta.registerVisit}
            variant="secondary"
            size="md"
            className="w-full justify-center active:scale-[0.98] transition-transform text-sm py-2.5"
          >
            Register to Visit
          </Button>
        </div>
      </div>
    </>
  );
}
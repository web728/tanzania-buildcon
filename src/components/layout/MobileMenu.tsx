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

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on ESC key press
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
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Drawer Menu */}
      <div
        id="mobile-menu"
        className={clsx(
          "fixed inset-x-0 top-[64px] z-40 h-[calc(100dvh-64px)] overflow-y-auto bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden shadow-2xl",
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col justify-between min-h-full px-6 py-6">
          <ul className="flex flex-col divide-y divide-brand-border/60">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              const isExpanded = expanded === item.href;

              return (
                <li key={item.href} className="py-1.5">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3 text-left text-base font-semibold text-brand-dark transition-colors hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 rounded-md px-1"
                        aria-expanded={isExpanded}
                        aria-controls={`submenu-${item.href}`}
                        onClick={() => setExpanded((e) => (e === item.href ? null : item.href))}
                      >
                        <span className={clsx(isActive && "text-brand-blue font-bold")}>{item.label}</span>
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          className={clsx("transition-transform duration-200", isExpanded && "rotate-180")}
                          aria-hidden="true"
                        >
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* Accordion Submenu */}
                      <div
                        id={`submenu-${item.href}`}
                        className={clsx(
                          "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out",
                          isExpanded ? "grid-rows-[1fr] pb-2" : "grid-rows-[0fr]"
                        )}
                      >
                        <div className="min-h-0">
                          <ul className="flex flex-col gap-1 pl-4 mt-1 border-l-2 border-brand-border/40 ml-2">
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className={clsx(
                                      "block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                                      isChildActive
                                        ? "bg-brand-light text-brand-blue font-semibold"
                                        : "text-brand-body hover:bg-brand-light/60 hover:text-brand-blue"
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
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={clsx(
                        "block py-3 px-1 text-base font-semibold rounded-md transition-colors",
                        isActive ? "text-brand-blue font-bold" : "text-brand-dark hover:text-brand-blue"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Sticky/Bottom CTA Section */}
          <div className="mt-8 pt-4 border-t border-brand-border/50 flex flex-col gap-3">
            <Button href={event.cta.bookStand} variant="primary" size="lg" className="w-full shadow-md active:scale-[0.98] transition-transform">
              Book a Stand
            </Button>
            <Button href={event.cta.registerVisit} variant="secondary" size="lg" className="w-full active:scale-[0.98] transition-transform">
              Register to Visit
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
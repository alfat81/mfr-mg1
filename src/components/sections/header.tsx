"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav shadow-navy py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-white/95 ring-1 ring-gold/30 shadow-gold">
              <img
                src="/images/logo_sm.webp"
                alt="Комиссия по ФУМ МФР"
                className="h-full w-full object-contain p-1.5"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-bold text-white text-[15px] tracking-tight">
                Комиссия по ФУМ
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-gold/80 font-medium">
                Мотоциклетная федерация России
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              const isHighlight = link.href === "#partners";
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200",
                    isHighlight
                      ? "bg-gold text-navy-deep hover:bg-gold-dark shadow-gold"
                      : isActive
                        ? "bg-white/12 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#contacts"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep px-5 py-2.5 text-[13px] font-bold shadow-gold hover:scale-105 transition-transform"
            >
              Хочу участвовать
              <ChevronRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
              aria-label="Открыть меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy-deep/70 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-navy-deep shadow-2xl p-6 flex flex-col transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-display font-bold text-white text-lg">
              Меню
            </span>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
              aria-label="Закрыть меню"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 text-white/85 hover:bg-white/10 hover:text-white transition-colors",
                  link.href === "#partners" && "text-gold"
                )}
              >
                <span className="text-[15px] font-medium">{link.label}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-6">
            <Button
              asChild
              className="w-full bg-gold text-navy-deep hover:bg-gold-dark font-bold h-12"
            >
              <a href="#contacts" onClick={() => setOpen(false)}>
                Хочу участвовать
              </a>
            </Button>
            <p className="mt-4 text-center text-xs text-white/50">
              © 2026 Комиссия по ФУМ МФР
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Button } from "@/components/Button";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlay = pathname !== "/contact" && pathname !== "/privacy";
  const solid = !overlay || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.getElementById("content");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      firstLinkRef.current?.focus();
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuPath(null);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tone = solid ? "text-charcoal" : "text-ivory";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-50 border-b transition-colors duration-300 ${
          solid ? "border-stone bg-ivory/95 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-6 px-6 md:px-10 lg:px-16">
        <Link href="/" className={`leading-none ${tone}`} aria-label={`${siteConfig.name} home`}>
          <span className="block font-serif text-[1.7rem] tracking-tight">Ascent</span>
          <span className="mt-1 block text-[0.58rem] tracking-[0.28em] uppercase">Design Studios</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navigation.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.7rem] tracking-[0.18em] uppercase transition-opacity hover:opacity-60 ${tone} ${
                  active ? "opacity-100" : "opacity-90"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href="/contact" variant={solid ? "solid" : "light"}>
              Book a Consultation
            </Button>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className={`inline-flex min-h-11 items-center px-1 text-[0.68rem] tracking-[0.18em] uppercase lg:hidden ${tone}`}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 overflow-y-auto bg-ivory px-6 pt-28 pb-12 lg:hidden"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                aria-current={isActive(item.href, pathname) ? "page" : undefined}
                className="font-serif text-5xl text-charcoal"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="mt-10">
            Book a Consultation
          </Button>
        </div>
      )}
    </header>
  );
}

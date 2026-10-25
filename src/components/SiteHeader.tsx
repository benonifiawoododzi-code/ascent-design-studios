"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Wordmark } from "@/components/Wordmark";
import { navigation } from "@/data/site";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function usesOverlay(pathname: string) {
  if (pathname === "/" || pathname === "/about" || pathname === "/services") return true;
  return pathname.startsWith("/projects/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlay = usesOverlay(pathname);
  const solid = !overlay || scrolled || open;
  const tone = solid ? "text-charcoal" : "text-ivory";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuPath(null);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.getElementById("content");
    const footer = document.querySelector("footer");
    const skip = document.querySelector(".skip-link");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      skip?.setAttribute("inert", "");
      firstLinkRef.current?.focus();
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      skip?.removeAttribute("inert");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      skip?.removeAttribute("inert");
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

  function closeMenu() {
    setMenuPath(null);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-50 border-b transition-colors duration-300 ${
          solid ? "border-line bg-ivory/95 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1520px] items-center justify-between gap-6 px-5 sm:px-6 md:px-10 lg:px-14">
          <Wordmark tone={solid ? "dark" : "light"} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active = isActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline text-[0.72rem] tracking-[0.18em] uppercase ${tone} ${
                    active ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button href="/contact" variant={solid ? "solid" : "light"}>
                Start a project
              </Button>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex min-h-11 items-center px-1 text-[0.72rem] tracking-[0.18em] uppercase lg:hidden ${tone}`}
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
          className="fixed inset-0 z-40 overflow-y-auto bg-ivory px-5 pt-28 pb-12 sm:px-6 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                aria-current={isActive(item.href, pathname) ? "page" : undefined}
                onClick={closeMenu}
                className="border-b border-line py-4 font-serif text-[clamp(2.4rem,10vw,3.4rem)] leading-none text-charcoal"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="mt-8" onClick={closeMenu}>
            Start a project
          </Button>
        </div>
      )}
    </header>
  );
}

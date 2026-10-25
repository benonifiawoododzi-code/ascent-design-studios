import Link from "next/link";
import type { ReactNode } from "react";

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase ${className}`}
    >
      <span className="link-underline">{children}</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      >
        <path d="M3 9h12M11 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </Link>
  );
}

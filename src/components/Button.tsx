import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  solid: "bg-charcoal text-ivory hover:bg-olive",
  light: "bg-ivory text-charcoal hover:bg-white",
  ghost: "border border-current bg-transparent hover:bg-charcoal/5",
};

type ButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "solid",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center px-6 py-3 text-center text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

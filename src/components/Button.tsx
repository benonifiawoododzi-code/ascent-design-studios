import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  solid: "bg-charcoal text-ivory hover:bg-walnut",
  light: "bg-ivory text-charcoal hover:bg-paper",
  ghost: "border border-current bg-transparent hover:bg-charcoal/5",
};

type ButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className" | "children">;

export function Button({
  href,
  variant = "solid",
  className = "",
  children,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center px-6 py-3 text-center text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} rel="noopener noreferrer" target="_blank" onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

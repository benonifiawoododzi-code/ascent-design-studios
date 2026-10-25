import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1520px] px-5 sm:px-6 md:px-10 lg:px-14 ${className}`}>{children}</div>
  );
}

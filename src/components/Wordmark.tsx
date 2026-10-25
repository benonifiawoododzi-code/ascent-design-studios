import Link from "next/link";

export function Wordmark({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  const color = tone === "light" ? "text-ivory" : "text-charcoal";
  const phoenix =
    size === "lg"
      ? "mt-2 font-serif text-[2.7rem] tracking-[0.14em] sm:text-[3.15rem]"
      : "mt-1 font-serif text-[1.45rem] tracking-[0.14em] sm:text-[1.65rem] sm:tracking-[0.16em]";
  const studio = size === "lg" ? "text-[0.68rem] tracking-[0.48em]" : "text-[0.58rem] tracking-[0.42em] sm:tracking-[0.46em]";

  return (
    <Link href="/" className={`group inline-flex flex-col leading-none ${color}`}>
      <span className={`uppercase ${studio}`}>Studio</span>
      <span className={phoenix}>Phoenix</span>
      <span
        className="mt-2 h-px w-7 bg-current opacity-70 transition-[width] duration-300 group-hover:w-12 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  );
}

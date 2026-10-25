import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col justify-end bg-charcoal px-6 pt-32 pb-20 text-ivory md:px-10 lg:px-16">
      <p className="text-[0.72rem] tracking-[0.22em] uppercase">404</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,7vw,6rem)] font-light text-ivory">
        This page is not on the plan.
      </h1>
      <p className="mt-5 max-w-md text-ivory/80">The address may have changed, or the page has not been published.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="light">
          Home
        </Button>
        <Button href="/projects" variant="ghost" className="border-ivory text-ivory hover:bg-ivory/10">
          Projects
        </Button>
      </div>
    </div>
  );
}

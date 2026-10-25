import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-[1520px] flex-col justify-end px-5 pt-32 pb-20 sm:px-6 md:px-10 lg:px-14">
      <p className="eyebrow text-walnut">404</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,7vw,6rem)] font-light">
        This page could not be found.
      </h1>
      <p className="mt-5 max-w-md text-walnut">The address may be incorrect, or the page has not been published.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Home</Button>
        <Button href="/projects" variant="ghost">
          Projects
        </Button>
      </div>
    </div>
  );
}

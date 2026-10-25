import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { hasSampleProjects } from "@/lib/projects";
import { navigation, serviceLinks, siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";

export function SiteFooter() {
  const showContentNote = hasSampleProjects() || testimonials.some((item) => item.placeholder);

  return (
    <footer className="border-t border-stone bg-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-16 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-serif text-4xl tracking-tight">Ascent</p>
          <p className="mt-2 text-[0.62rem] tracking-[0.28em] uppercase">Design Studios</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            {siteConfig.tagline} Residential, commercial, and hospitality interiors shaped with
            architectural clarity and material care.
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-charcoal/70">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:text-olive">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-charcoal/70">Services</p>
          <ul className="mt-4 space-y-2">
            {serviceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:text-olive">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-charcoal/70">Contact</p>
          <div className="mt-4">
            <ContactDetails />
          </div>
        </div>
      </div>

      <div className="border-t border-stone">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-6 text-sm md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
          <div className="max-w-xl space-y-2">
            <p>© {siteConfig.copyrightYear} {siteConfig.name}</p>
            {showContentNote && (
              <p className="text-sm leading-relaxed text-charcoal/80">
                Sample projects and placeholder quotations are labeled on the site. They are not
                records of completed commissions or client feedback.
              </p>
            )}
          </div>
          <Link href="/privacy" className="text-[0.72rem] tracking-[0.16em] uppercase hover:text-olive">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

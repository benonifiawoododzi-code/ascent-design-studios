import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { Wordmark } from "@/components/Wordmark";
import { navigation, serviceLinks, siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { hasSampleProjects } from "@/lib/projects";

const footerNav = [{ href: "/", label: "Home" }, ...navigation];

export function SiteFooter() {
  const showContentNote = hasSampleProjects() || testimonials.some((item) => item.placeholder);

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-[1520px] gap-14 px-5 py-16 sm:px-6 md:px-10 lg:grid-cols-12 lg:px-14 lg:py-20">
        <div className="lg:col-span-4">
          <Wordmark tone="light" size="lg" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/80">{siteConfig.statement}</p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[0.72rem] tracking-[0.18em] text-ivory/55 uppercase">Navigate</p>
          <ul className="mt-5 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm text-ivory/90">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.72rem] tracking-[0.18em] text-ivory/55 uppercase">Services</p>
          <ul className="mt-5 space-y-2">
            {serviceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm text-ivory/90">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.72rem] tracking-[0.18em] text-ivory/55 uppercase">Contact</p>
          <div className="mt-5">
            <ContactDetails variant="inverse" />
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-4 px-5 py-6 text-sm text-ivory/70 sm:px-6 md:flex-row md:items-end md:justify-between md:px-10 lg:px-14">
          <div className="max-w-xl space-y-2">
            <p>
              © {siteConfig.copyrightYear} {siteConfig.name}
            </p>
            {showContentNote && (
              <p className="leading-relaxed">
                Sample projects and placeholder quotations are labeled. They are not records of completed
                commissions or client feedback.
              </p>
            )}
          </div>
          <Link href="/privacy" className="link-underline text-[0.72rem] tracking-[0.16em] text-ivory uppercase">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

import { getSocialLinks, getWhatsAppHref, siteConfig } from "@/data/site";

export function ContactDetails({ variant = "default" }: { variant?: "default" | "inverse" }) {
  const inverse = variant === "inverse";
  const muted = inverse ? "text-ivory/55" : "text-walnut";
  const value = inverse ? "text-ivory" : "text-charcoal";
  const whatsapp = getWhatsAppHref();
  const phoneHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : "";
  const rows = [
    siteConfig.email
      ? { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` }
      : null,
    siteConfig.phone ? { label: "Telephone", value: siteConfig.phone, href: phoneHref } : null,
    siteConfig.location ? { label: "Studio", value: siteConfig.location } : null,
    siteConfig.hours ? { label: "Hours", value: siteConfig.hours } : null,
  ].filter((row) => row !== null);

  const social = getSocialLinks();

  if (rows.length === 0 && !whatsapp && social.length === 0) {
    return (
      <div className={`max-w-sm space-y-4 text-sm leading-relaxed ${inverse ? "text-ivory/75" : "text-walnut"}`}>
        <p>Email, telephone, and location will be published here once the studio confirms them.</p>
        <p>Social profiles will appear here when they are confirmed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {rows.length > 0 && (
        <dl className="space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className={`text-[0.68rem] tracking-[0.18em] uppercase ${muted}`}>{row.label}</dt>
              <dd className={`mt-1 text-base ${value}`}>
                {row.href ? (
                  <a href={row.href} className="link-underline">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {whatsapp && (
        <a
          href={whatsapp}
          className={`link-underline inline-flex text-[0.72rem] tracking-[0.16em] uppercase ${value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp the studio
        </a>
      )}
      {social.length > 0 ? (
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`link-underline text-[0.72rem] tracking-[0.16em] uppercase ${value}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm leading-relaxed ${inverse ? "text-ivory/75" : "text-walnut"}`}>
          Social profiles will appear here when they are confirmed.
        </p>
      )}
    </div>
  );
}

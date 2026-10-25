import { getSocialLinks, getWhatsAppHref, siteConfig } from "@/data/site";

export function ContactDetails() {
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
      <p className="max-w-sm text-sm leading-relaxed text-charcoal/80">
        Studio email, telephone, and location will be published here once they are confirmed.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {rows.length > 0 && (
        <dl className="space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-[0.68rem] tracking-[0.18em] uppercase text-charcoal/70">{row.label}</dt>
              <dd className="mt-1 text-base">
                {row.href ? (
                  <a href={row.href} className="hover:text-olive">
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
        <a href={whatsapp} className="inline-flex text-[0.72rem] tracking-[0.16em] uppercase hover:text-olive" target="_blank" rel="noopener noreferrer">
          WhatsApp the studio
        </a>
      )}
      {social.length > 0 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {social.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="text-[0.72rem] tracking-[0.16em] uppercase hover:text-olive" target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

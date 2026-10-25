/**
 * Studio configuration.
 *
 * Replace empty strings with verified details. Empty contact fields stay hidden.
 * Inquiry delivery is separate: see .env.example (Resend). The form will not
 * report success until that service is connected.
 */

function publicEnv(name: string, fallback = "") {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return value.trim();
}

export const siteConfig = {
  name: "Ascent Design Studios",
  copyrightYear: "2026",
  tagline: "Elevating Spaces. Inspiring Living.",
  description:
    "Ascent Design Studios creates thoughtful residential, commercial, and hospitality interiors. Elevating Spaces. Inspiring Living.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  email: publicEnv("NEXT_PUBLIC_STUDIO_EMAIL"),
  phone: publicEnv("NEXT_PUBLIC_STUDIO_PHONE"),
  whatsapp: publicEnv("NEXT_PUBLIC_STUDIO_WHATSAPP"),
  location: publicEnv("NEXT_PUBLIC_STUDIO_LOCATION"),
  hours: publicEnv("NEXT_PUBLIC_STUDIO_HOURS", "By appointment"),
  social: {
    instagram: publicEnv("NEXT_PUBLIC_SOCIAL_INSTAGRAM"),
    pinterest: publicEnv("NEXT_PUBLIC_SOCIAL_PINTEREST"),
    linkedin: publicEnv("NEXT_PUBLIC_SOCIAL_LINKEDIN"),
  },
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceLinks = [
  { href: "/services#residential", label: "Residential Design" },
  { href: "/services#commercial", label: "Commercial Design" },
  { href: "/services#hospitality", label: "Hospitality Design" },
] as const;

export const inquiryOptions = {
  categories: ["Residential", "Commercial", "Hospitality", "Mixed use", "Not sure yet"],
  sizes: ["Not yet defined", "Under 50 m²", "50–120 m²", "120–300 m²", "300 m² or more"],
  /** Currency is intentionally unset. Replace these bands before launch. */
  budgets: ["Not yet defined", "Under 25,000", "25,000–75,000", "75,000–200,000", "200,000 or more"],
  contactMethods: ["Email", "Phone", "No preference"],
} as const;

export function externalUrl(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function getSocialLinks() {
  return [
    { label: "Instagram", href: externalUrl(siteConfig.social.instagram) },
    { label: "Pinterest", href: externalUrl(siteConfig.social.pinterest) },
    { label: "LinkedIn", href: externalUrl(siteConfig.social.linkedin) },
  ].filter((item) => item.href);
}

export function getWhatsAppHref() {
  const digits = siteConfig.whatsapp.replace(/\D/g, "");
  if (digits.length < 8) return "";
  const text = encodeURIComponent(
    "Hello Ascent Design Studios, I would like to enquire about an interior project.",
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export const scopeNote =
  "Listed items are design services the studio can provide. Measured drawings, specifications, procurement, and site coordination are included only when they are written into that project's proposal.";

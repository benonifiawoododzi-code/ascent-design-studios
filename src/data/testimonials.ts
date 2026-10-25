export type Testimonial = {
  quote: string;
  attribution: string;
  category: string;
  /** Placeholder quotes must stay labeled and must not be presented as client feedback. */
  placeholder: boolean;
};

/**
 * Replace a placeholder with a verified client comment, then set placeholder to false.
 * Do not add names, companies, or endorsements that the studio has not approved.
 */
export const testimonials: Testimonial[] = [
  {
    quote: "A verified comment from a residential client will be placed here.",
    attribution: "Client name awaiting confirmation",
    category: "Residential",
    placeholder: true,
  },
  {
    quote: "A verified comment from a commercial client will be placed here.",
    attribution: "Client name awaiting confirmation",
    category: "Commercial",
    placeholder: true,
  },
  {
    quote: "A verified comment from a hospitality client will be placed here.",
    attribution: "Client name awaiting confirmation",
    category: "Hospitality",
    placeholder: true,
  },
];

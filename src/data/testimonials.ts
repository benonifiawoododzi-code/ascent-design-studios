export type Testimonial = {
  quote: string;
  attribution: string;
  category: string;
  /** Placeholder quotes must stay labeled and must not be presented as client feedback. */
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sample quotation for the residential layout. Replace this sentence with approved client feedback before publication.",
    attribution: "Sample attribution",
    category: "Residential",
    placeholder: true,
  },
  {
    quote:
      "Sample quotation for the commercial layout. Replace this sentence with approved client feedback before publication.",
    attribution: "Sample attribution",
    category: "Commercial",
    placeholder: true,
  },
  {
    quote:
      "Sample quotation for the hospitality layout. Replace this sentence with approved client feedback before publication.",
    attribution: "Sample attribution",
    category: "Hospitality",
    placeholder: true,
  },
];

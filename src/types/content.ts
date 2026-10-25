export type ProjectCategory = "Residential" | "Commercial" | "Hospitality";

export type GalleryLayout = "full" | "half" | "detail";

export type StudioImage = {
  src: string;
  alt: string;
  caption?: string;
  layout?: GalleryLayout;
  objectPosition?: string;
};

export type BeforeAfter = {
  before: StudioImage;
  after: StudioImage;
  /** True when the pair is a placeholder for the comparison control, not one documented renovation. */
  demonstration: boolean;
  note: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Illustrative setting for sample work. Omit when a real location is not confirmed. */
  location?: string;
  /** Omit unless the completion year is verified. */
  year?: string;
  /** Omit unless the area is verified. */
  area?: string;
  /** Sample projects are layout placeholders, not completed studio commissions. */
  sample: boolean;
  featured?: boolean;
  excerpt: string;
  cover: StudioImage;
  hero: StudioImage;
  brief: string;
  objectives: string[];
  concept: string;
  challenges: string[];
  solutions: string[];
  materials: string[];
  spatialApproach: string;
  services: string[];
  gallery: StudioImage[];
  beforeAfter?: BeforeAfter;
};

export type Service = {
  id: "residential" | "commercial" | "hospitality";
  name: string;
  pageTitle: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  covers: string[];
  considerations: string[];
  deliverables: string[];
  image: StudioImage;
};

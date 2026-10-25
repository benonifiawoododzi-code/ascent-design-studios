import type { Service } from "@/types/content";

/**
 * Edit service copy, imagery, and deliverables here.
 * Only list work the studio actually offers. Scope is confirmed per project.
 */
export const services: Service[] = [
  {
    id: "residential",
    name: "Residential Interiors",
    pageTitle: "Residential Interiors",
    category: "Residential",
    summary:
      "Personalized interiors shaped around daily rituals, spatial flow, material quality, and a distinct sense of home.",
    overview:
      "Homes are planned around the way a household actually lives: where the day begins, where people gather, and where the plan should become quiet. Layout, light, and a narrow palette of materials are resolved together.",
    covers: [
      "Interior concepts",
      "Spatial planning",
      "Material and finish selection",
      "Lighting and furniture direction",
      "Interior styling",
    ],
    considerations: [
      "A house or apartment whose daily routines should shape the plan",
      "A wish to decide layout, materials, lighting, and furniture as one interior",
      "A preference for a calm palette that can be lived with for years",
      "Storage, privacy, and the quality of natural light",
    ],
    deliverables: [
      "Space-planning proposals",
      "Concept direction",
      "Material and finish palettes",
      "Furniture and lighting direction",
      "Styling guidance",
    ],
    image: {
      src: "/images/form-4.jpg",
      alt: "Kitchen with charcoal cabinetry, marble counters, timber shelves, and a window above the sink.",
    },
  },
  {
    id: "commercial",
    name: "Commercial Interiors",
    pageTitle: "Commercial Interiors",
    category: "Commercial",
    summary:
      "Purposeful environments that bring spatial clarity, brand expression, and the needs of people into balance.",
    overview:
      "Workplaces and client-facing rooms need a legible sequence: arrival, conversation, and focused work. The organisation should be felt through proportion, material, and light rather than applied graphics.",
    covers: [
      "Workplace interiors",
      "Retail and client-facing spaces",
      "Spatial planning",
      "Brand-aligned environments",
      "Material and lighting direction",
    ],
    considerations: [
      "A studio, office, or client room that needs a clearer sequence",
      "A wish to express the organisation through space and material",
      "Requirements for focus, meeting, acoustic comfort, and arrival",
      "Finishes that can withstand daily commercial use",
    ],
    deliverables: [
      "Planning options for work and public zones",
      "Concept direction aligned with the organisation",
      "Material, furniture, and lighting direction",
      "Reception and meeting-room design",
    ],
    image: {
      src: "/images/atelier-1.jpg",
      alt: "Long office interior with a pale floor, dark walls, and a glass-lined corridor.",
    },
  },
  {
    id: "hospitality",
    name: "Hospitality Design",
    pageTitle: "Hospitality Design",
    category: "Hospitality",
    summary:
      "Atmospheric, welcoming spaces designed to create memorable experiences through thoughtful planning and detail.",
    overview:
      "Guest rooms, dining rooms, and lounges are designed as a sequence of atmospheres. Comfort, the way the room is operated, and a memorable material palette carry equal weight.",
    covers: [
      "Guest accommodation",
      "Restaurants and lounges",
      "Guest experience and atmosphere",
      "Spatial planning",
      "Furniture, lighting, and finish direction",
    ],
    considerations: [
      "Guest rooms, a dining room, or a lounge that should feel specific",
      "A need to balance atmosphere with service and turnover",
      "Lighting for daytime use and for evening",
      "Furniture and finishes chosen for hospitality wear",
    ],
    deliverables: [
      "Guest-room and public-area concepts",
      "Planning for guest and service movement",
      "Furniture, lighting, and material palettes",
      "Styling direction for the completed interior",
    ],
    image: {
      src: "/images/courtyard-1.jpg",
      alt: "Restaurant dining room with dark timber floors, black chairs, brass screens, and tables set for service.",
    },
  },
];

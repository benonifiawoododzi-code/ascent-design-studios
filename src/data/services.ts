import type { Service } from "@/types/content";

/**
 * Edit service copy, imagery, and deliverables here.
 * Only list work the studio actually offers. Scope is confirmed per project.
 */
export const services: Service[] = [
  {
    id: "residential",
    name: "Residential Design",
    pageTitle: "Residential Interior Design",
    category: "Residential",
    summary:
      "Personalized homes and apartments shaped around comfort, functionality, material quality, and individual lifestyles.",
    overview:
      "Homes are planned around daily routines, privacy, and the quality of light. We edit the plan first, then build a palette of materials that can be lived with for years.",
    covers: [
      "Houses and apartments",
      "Space planning and layouts",
      "Material and finish selection",
      "Furniture and lighting specifications",
      "Interior styling",
      "Renovation and redesign concepts",
    ],
    considerations: [
      "How the household uses each room through the day",
      "Storage, circulation, and privacy",
      "Natural light, outlook, and acoustic comfort",
      "Materials that suit the way the home is maintained",
    ],
    deliverables: [
      "Space-planning proposals",
      "Concept direction and mood boards",
      "Material and finish palettes",
      "Furniture and lighting specifications",
      "Styling guidance",
    ],
    image: {
      src: "/images/solace-1.jpg",
      alt: "Living room with a grey sofa, a timber coffee table, and tall windows to the garden.",
    },
  },
  {
    id: "commercial",
    name: "Commercial Design",
    pageTitle: "Commercial Interior Design",
    category: "Commercial",
    summary:
      "Considered workspaces and business environments that support productivity, brand identity, and meaningful experiences.",
    overview:
      "Workplaces and customer-facing rooms need a clear sequence: arrival, focus, and conversation. The interior should carry the brand quietly, through proportion, material, and light.",
    covers: [
      "Offices and workspaces",
      "Retail and showroom environments",
      "Reception and customer-facing spaces",
      "Spatial planning",
      "Brand-aligned interiors",
      "Material and lighting coordination",
    ],
    considerations: [
      "Arrival, waiting, and meeting sequences",
      "Focus, collaboration, and acoustic separation",
      "Brand presence without visual noise",
      "Durability of finishes in daily use",
    ],
    deliverables: [
      "Planning options for work and public zones",
      "Concept direction aligned with the brand",
      "Material, furniture, and lighting specifications",
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
    pageTitle: "Hospitality Interior Design",
    category: "Hospitality",
    summary:
      "Distinctive interiors for hotels, restaurants, lounges, and guest environments that balance atmosphere, function, and memorable design.",
    overview:
      "Guest rooms, dining rooms, and lounges are designed as a sequence of atmospheres. Comfort, service flow, and a memorable material palette carry equal weight.",
    covers: [
      "Boutique hotels and guest accommodation",
      "Restaurants and cafés",
      "Lounges and leisure spaces",
      "Guest experience and atmosphere",
      "Furniture, lighting, and material palettes",
      "Functional planning and styling",
    ],
    considerations: [
      "Arrival, stay, and departure as a spatial sequence",
      "Lighting for daytime service and evening atmosphere",
      "Furniture that supports both comfort and turnover",
      "Materials chosen for hospitality wear",
    ],
    deliverables: [
      "Guest-room and public-area concepts",
      "Planning for service and guest movement",
      "Furniture, lighting, and material palettes",
      "Styling direction for the completed interior",
    ],
    image: {
      src: "/images/haven-1.jpg",
      alt: "Hotel bedroom in warm timber, with a low platform bed and doors opening to a planted court.",
    },
  },
];

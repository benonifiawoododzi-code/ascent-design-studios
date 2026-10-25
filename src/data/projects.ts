import type { GalleryLayout, Project, StudioImage } from "@/types/content";

/**
 * Portfolio content.
 *
 * To add a project: copy an entry, give it a unique slug, and point the images
 * at files in /public/images. Set sample to false only when the project,
 * location, and photography are real studio work.
 * Add a beforeAfter pair only when both photographs show the same space.
 */

const comparisonNote =
  "Demonstration only. These photographs are not before-and-after views of the same room, and they are not a record of a completed renovation. Replace both images with verified photography of one space before publishing this comparison as project documentation.";

function photo(
  file: string,
  alt: string,
  layout?: GalleryLayout,
  caption?: string,
): StudioImage {
  return {
    src: `/images/${file}`,
    alt,
    layout,
    caption,
  };
}

export const projects: Project[] = [
  {
    slug: "the-solace-residence",
    title: "The Solace Residence",
    category: "Residential",
    location: "Lisbon",
    sample: true,
    featured: true,
    excerpt:
      "A sample residence organized around long views, quiet materials, and rooms that stay calm in daily use.",
    cover: photo(
      "solace-1.jpg",
      "Placeholder photograph of a furnished living room with a low sofa and warm neutral finishes.",
    ),
    hero: photo(
      "solace-1.jpg",
      "Placeholder photograph of a furnished living room with a low sofa and warm neutral finishes.",
    ),
    brief:
      "An illustrative family home where the plan is simplified so daylight, oak, and limestone can do the work. This entry is a sample case study for the portfolio template.",
    objectives: [
      "Give the main rooms a clearer relationship to the garden",
      "Reduce corridors and leftover corners",
      "Build a palette that feels quiet rather than bare",
    ],
    concept:
      "The house is treated as a sequence of calm rooms along a single line of light. Furniture sits low, joinery absorbs storage, and the materials stay within a narrow range of stone, timber, and linen.",
    challenges: [
      "A deep plan that left the middle of the house dim",
      "Too many small rooms for the way the household gathers",
    ],
    solutions: [
      "Open the living and dining rooms along the garden edge",
      "Use full-height joinery to replace freestanding storage",
      "Keep the palette limited so the rooms read as one house",
    ],
    materials: ["Limewashed plaster", "Oak flooring and joinery", "Limestone", "Linen upholstery"],
    spatialApproach:
      "Daytime rooms share one outlook. Private rooms sit deeper in the plan, with shorter views and thicker walls between them.",
    services: [
      "Interior design concept",
      "Space planning",
      "Material and finish direction",
      "Furniture and lighting specification",
    ],
    gallery: [
      photo(
        "solace-1.jpg",
        "Placeholder photograph of a living room arranged around a low sofa.",
        "full",
        "Living room, sample photography.",
      ),
      photo(
        "solace-2.jpg",
        "Placeholder photograph of a contemporary living space in warm neutral tones.",
        "half",
      ),
      photo(
        "solace-3.jpg",
        "Placeholder photograph of daylight falling across soft furnishings and curtains.",
        "half",
      ),
      photo(
        "solace-4.jpg",
        "Placeholder photograph of a styled seating area with a restrained material palette.",
        "detail",
        "Seating and textile detail, sample photography.",
      ),
    ],
  },
  {
    slug: "the-form-house",
    title: "The Form House",
    category: "Residential",
    location: "Copenhagen",
    sample: true,
    featured: true,
    excerpt:
      "A sample house where changes in level and ceiling height define the rooms more than corridors do.",
    cover: photo(
      "form-1.jpg",
      "Dusk photograph of a timber and glass house, with the dining room visible through the glazing.",
    ),
    hero: photo(
      "form-3.jpg",
      "Living room with pale sofas, a timber stair, and tall windows along one side.",
    ),
    brief:
      "An illustrative pavilion house. Rooms are separated by shifts in level and light, with the kitchen as the center of the plan.",
    objectives: [
      "Make the kitchen the center of daily life without letting it dominate",
      "Keep the architecture legible from the approach",
      "Use a small number of robust materials",
    ],
    concept:
      "The house reads as a few precise volumes. Inside, the kitchen island sets the measure for the dining table and the living room beyond.",
    challenges: [
      "An open plan that needed definition without new walls",
      "A kitchen that had to work for cooking and for gathering",
    ],
    solutions: [
      "Step the floor and the ceiling to mark each room",
      "Align the island, table, and hearth on one axis",
      "Hold the palette to timber, stone, and white plaster",
    ],
    materials: ["White oiled oak", "Honed stone", "Matte plaster", "Blackened metal details"],
    spatialApproach:
      "Public rooms occupy the long side of the house. A shorter wing holds bedrooms, reached without crossing the kitchen.",
    services: [
      "Interior design concept",
      "Space planning",
      "Kitchen and joinery direction",
      "Material and finish direction",
    ],
    gallery: [
      photo(
        "form-1.jpg",
        "Dusk photograph of a timber and glass house, with the dining room visible through the glazing.",
        "full",
        "Approach, sample photography.",
      ),
      photo(
        "form-3.jpg",
        "Living room with pale sofas, a timber stair, and tall windows along one side.",
        "half",
      ),
      photo(
        "form-4.jpg",
        "Kitchen with dark green cabinetry, a marble counter, and a window over the sink.",
        "half",
      ),
      photo(
        "form-2.jpg",
        "Street approach to a timber and glass house, with a paved court in front.",
        "detail",
      ),
    ],
  },
  {
    slug: "the-atelier-workspace",
    title: "The Atelier Workspace",
    category: "Commercial",
    location: "London",
    sample: true,
    featured: true,
    excerpt:
      "A sample studio workplace planned for focused work, with a material palette of plaster, timber, and steel.",
    cover: photo(
      "atelier-1.jpg",
      "Long office interior with a pale floor, dark walls, and a glass-lined corridor.",
    ),
    hero: photo(
      "atelier-2.jpg",
      "Meeting room with a timber table, pink chairs, and tall industrial windows.",
    ),
    brief:
      "An illustrative workspace for a small creative practice. The rooms support concentrated work and a calm client arrival.",
    objectives: [
      "Separate focused desks from conversation",
      "Give clients a clear, unhurried arrival",
      "Let the materials reflect a design practice without theming the office",
    ],
    concept:
      "A plaster shell, oak tables, and a few pieces of blackened steel. The brand is present in the editing, not in applied graphics.",
    challenges: [
      "One open room that was too exposed for calls and pin-ups",
      "A reception that felt like a leftover corridor",
    ],
    solutions: [
      "Place meeting space at the front and desks deeper in the plan",
      "Use joinery, rather than solid walls, to screen the work area",
      "Tune lighting separately for desks and for the meeting table",
    ],
    materials: ["Mineral plaster", "Oak worktables", "Blackened steel", "Wool carpet in meeting rooms"],
    spatialApproach:
      "Visitors stop at a small reception and meeting room. The working studio sits beyond, with borrowed light and a lower level of activity at the entrance.",
    services: [
      "Workplace planning",
      "Interior design concept",
      "Furniture and lighting specification",
      "Material direction",
    ],
    gallery: [
      photo("atelier-2.jpg", "Meeting room with a timber table, pink chairs, and tall industrial windows.", "full"),
      photo(
        "atelier-1.jpg",
        "Long office interior with a pale floor, dark walls, and a glass-lined corridor.",
        "half",
      ),
      photo(
        "atelier-4.jpg",
        "Quiet work interior prepared as sample photography for the studio workplace.",
        "half",
      ),
    ],
  },
  {
    slug: "the-haven-retreat",
    title: "The Haven Retreat",
    category: "Hospitality",
    location: "Mallorca",
    sample: true,
    featured: true,
    excerpt:
      "A sample guest-room interior planned for shade, cross-ventilation, and a slower arrival.",
    cover: photo(
      "haven-1.jpg",
      "Placeholder photograph of a hotel bedroom with a made bed and daylight from one side.",
    ),
    hero: photo(
      "haven-2.jpg",
      "Placeholder photograph of a bright hotel bedroom dressed in white linens.",
    ),
    brief:
      "Illustrative guest rooms for a small hotel. The design concentrates on sleep, shade, and a simple ritual of arrival.",
    objectives: [
      "Make the bed the clear focus of the room",
      "Control glare without making the room dark",
      "Specify furniture that housekeeping can reset quickly",
    ],
    concept:
      "A reduced room: one upholstered headboard, linen, a timber bench, and light tempered by sheer curtains. Decoration is limited to what a guest uses.",
    challenges: [
      "Strong afternoon sun on the garden elevation",
      "Small rooms that felt crowded once luggage and seating were added",
    ],
    solutions: [
      "Layer sheers and a heavier drape on the sunny side only",
      "Build luggage storage into a low bench",
      "Keep the palette nearly monochrome so the room feels larger",
    ],
    materials: ["Washed linen", "Lime plaster", "Oak", "Local stone at the threshold"],
    spatialApproach:
      "The entry is compressed, then the room opens toward the bed and the shaded opening. The bathing room sits to the side, out of the first view.",
    services: [
      "Guest-room concept",
      "Furniture and lighting specification",
      "Material palette",
      "Styling direction",
    ],
    gallery: [
      photo("haven-1.jpg", "Placeholder photograph of a hotel bedroom in neutral textiles.", "full"),
      photo("haven-2.jpg", "Placeholder photograph of a white hotel bed and canopy lighting.", "half"),
      photo("haven-3.jpg", "Placeholder photograph of a moodier hotel bedroom.", "half"),
      photo("haven-4.jpg", "Placeholder photograph of a neatly dressed hotel bed.", "detail"),
    ],
  },
  {
    slug: "the-linen-apartment",
    title: "The Linen Apartment",
    category: "Residential",
    location: "Paris",
    sample: true,
    featured: true,
    excerpt:
      "A sample apartment edited back to a few materials, with storage absorbed into the architecture.",
    cover: photo(
      "linen-3.jpg",
      "White bedroom with a layered bed, a window, and a small bench at the foot of the room.",
    ),
    hero: photo(
      "linen-3.jpg",
      "White bedroom with a layered bed, a window, and a small bench at the foot of the room.",
    ),
    brief:
      "An illustrative city apartment. The plan is tightened so a compact home can still feel composed, with storage hidden in the walls.",
    objectives: [
      "Recover floor space from freestanding furniture",
      "Give the bedroom a quieter relationship to the street",
      "Repeat one textile and one timber through the home",
    ],
    concept:
      "Joinery takes the role of the armoire and the sideboard. What remains loose is a bed, a table, and a small group of chairs.",
    challenges: [
      "Shallow rooms and tall windows onto a noisy street",
      "A lack of storage that had filled the rooms with furniture",
    ],
    solutions: [
      "Line the inner walls with full-height cupboards",
      "Set the bed against the quieter wall, away from the glass",
      "Use the same oak and linen in each room",
    ],
    materials: ["Oak joinery", "Linen", "Painted plaster", "Travertine in the bathing room"],
    spatialApproach:
      "The apartment is a short sequence: entry joinery, a living room on the street, and a bedroom turned toward the courtyard side.",
    services: [
      "Apartment planning",
      "Joinery concept",
      "Material and finish direction",
      "Furniture specification",
    ],
    gallery: [
      photo("linen-3.jpg", "White bedroom with layered bedding and a window to the side.", "full"),
      photo(
        "linen-2.jpg",
        "Bedroom with a pale upholstered bed, grey curtains, and a view over a city.",
        "half",
      ),
    ],
  },
  {
    slug: "the-north-room",
    title: "The North Room",
    category: "Commercial",
    location: "Amsterdam",
    sample: true,
    featured: true,
    excerpt:
      "A sample reception and meeting suite for a professional firm, tuned for acoustic comfort.",
    cover: photo(
      "north-2.jpg",
      "Office corridor lined with black-framed glass rooms, with a lounge visible beyond the glass.",
    ),
    hero: photo(
      "north-2.jpg",
      "Office corridor lined with black-framed glass rooms, with a lounge visible beyond the glass.",
    ),
    brief:
      "An illustrative client suite. Reception, waiting, and the meeting room are designed as one quiet sequence.",
    objectives: [
      "Make the first impression calm and specific",
      "Improve speech privacy in the meeting room",
      "Avoid a generic corporate fit-out",
    ],
    concept:
      "A north-lit room finished in timber, wool, and a single deep color on the meeting-room wall. Branding is limited to the way the rooms are arranged.",
    challenges: [
      "Hard surfaces that made conversation brittle",
      "A reception desk that blocked the view into the suite",
    ],
    solutions: [
      "Lower the desk and pull it off the main axis",
      "Add textile and timber where people sit and talk",
      "Separate circulation from the waiting seats",
    ],
    materials: ["Oak", "Wool upholstery", "Painted plaster", "Linen curtains"],
    spatialApproach:
      "Guests wait beside the light, not in a corridor. The meeting room is a distinct volume with its own door and acoustic lining.",
    services: [
      "Reception and meeting-room design",
      "Space planning",
      "Furniture and lighting specification",
      "Material direction",
    ],
    gallery: [
      photo(
        "north-2.jpg",
        "Office corridor lined with black-framed glass rooms, with a lounge visible beyond the glass.",
        "full",
      ),
      photo(
        "north-1.jpg",
        "High table beside floor-to-ceiling office windows, with a laptop and white chairs.",
        "half",
      ),
    ],
  },
  {
    slug: "the-courtyard-table",
    title: "The Courtyard Table",
    category: "Hospitality",
    location: "Milan",
    sample: true,
    featured: false,
    excerpt:
      "A sample dining room arranged around a courtyard, with lighting for lunch and for late service.",
    cover: photo(
      "courtyard-1.jpg",
      "Placeholder photograph of a restaurant dining room with set tables.",
    ),
    hero: photo(
      "courtyard-1.jpg",
      "Placeholder photograph of a restaurant dining room with set tables.",
    ),
    brief:
      "An illustrative restaurant interior. Tables are planned around a courtyard so daylight leads the lunch service and lighting takes over at night.",
    objectives: [
      "Give every table a clear relationship to the court or the room",
      "Support two moods without two different interiors",
      "Keep service routes short and out of the main view",
    ],
    concept:
      "A timber-lined room, stone underfoot, and a lighting plan that can be lowered in layers. The courtyard is the centerpiece, not a backdrop.",
    challenges: [
      "A deep room that felt flat once the tables were in",
      "Evening lighting that had been too bright for the food and too dim for service",
    ],
    solutions: [
      "Step the table spacing so the court remains visible",
      "Separate ambient, table, and service light",
      "Line the long wall with banquette seating to free the floor",
    ],
    materials: ["Oiled timber", "Stone flooring", "Leather banquettes", "Linen at the tables"],
    spatialApproach:
      "Guests enter along the side, not through the middle of the room. The court is revealed at the end of that short approach.",
    services: [
      "Restaurant interior concept",
      "Furniture layout",
      "Lighting and material palette",
      "Styling direction",
    ],
    gallery: [
      photo("courtyard-1.jpg", "Placeholder photograph of a restaurant interior.", "full"),
      photo("courtyard-2.jpg", "Placeholder photograph of a warmly lit dining room.", "half"),
      photo(
        "courtyard-3.jpg",
        "Placeholder photograph of a hospitality interior prepared for the portfolio.",
        "half",
      ),
    ],
  },
  {
    slug: "the-stone-house",
    title: "The Stone House",
    category: "Residential",
    location: "Hudson Valley",
    sample: true,
    featured: false,
    excerpt:
      "A sample study in pairing a heavy stone shell with a lighter interior. The comparison on this page is a demonstration, not a documented renovation.",
    cover: photo(
      "stone-1.jpg",
      "Dusk photograph of a dark metal and timber house, with a lit entry and stone at the base.",
    ),
    hero: photo(
      "stone-1.jpg",
      "Dusk photograph of a dark metal and timber house, with a lit entry and stone at the base.",
    ),
    brief:
      "An illustrative stone house. The written concept explores a lighter interior inside a heavy shell. It is not a record of a built commission.",
    objectives: [
      "Soften a masonry interior without hiding the structure",
      "Simplify the plan between kitchen, dining, and living",
      "Test a before-and-after comparison for the website template",
    ],
    concept:
      "Limewash, timber, and a lower line of furniture let the stone read as architecture rather than decoration. Openings are kept deep so the walls keep their weight.",
    challenges: [
      "Dark masonry and small existing openings",
      "A kitchen that sat apart from the room where people gathered",
    ],
    solutions: [
      "Lighten the inner faces with limewash and leave the structure visible",
      "Align kitchen, table, and seating on one floor plane",
      "Use timber for the elements people touch",
    ],
    materials: ["Existing stone", "Limewash", "Oak", "Linen"],
    spatialApproach:
      "The main room is one volume with three uses. Private rooms remain beyond a thick masonry wall.",
    services: [
      "Interior design concept",
      "Space planning",
      "Material direction",
      "Furniture specification",
    ],
    gallery: [
      photo(
        "stone-1.jpg",
        "Dusk photograph of a dark metal and timber house, with a lit entry and stone at the base.",
        "full",
      ),
      photo(
        "stone-2.jpg",
        "Living room with a white sofa, a gallery wall, and sheer curtains.",
        "half",
      ),
    ],
    beforeAfter: {
      demonstration: true,
      note: comparisonNote,
      before: photo(
        "stone-before.jpg",
        "A simply furnished living room with a grey sofa, shown only to demonstrate the before side of the comparison.",
      ),
      after: photo(
        "hero.jpg",
        "A more composed living room with a brown sofa and large windows, shown only to demonstrate the after side of the comparison.",
      ),
    },
  },
];

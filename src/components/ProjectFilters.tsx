const filters = [
  { id: "all", label: "All Projects" },
  { id: "Residential", label: "Residential" },
  { id: "Commercial", label: "Commercial" },
  { id: "Hospitality", label: "Hospitality" },
];

export function ProjectFilters({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-x-7 gap-y-3">
      {filters.map((filter) => {
        const selected = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(filter.id)}
            className={`min-h-11 text-[0.72rem] tracking-[0.18em] uppercase ${
              selected ? "text-charcoal" : "text-charcoal/55 hover:text-charcoal"
            }`}
          >
            <span className={selected ? "border-b border-charcoal pb-1" : ""}>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}

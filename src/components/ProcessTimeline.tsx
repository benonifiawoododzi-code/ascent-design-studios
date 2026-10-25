import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  return (
    <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-8">
      <div className="absolute top-5 right-0 left-0 hidden h-px bg-line lg:block" aria-hidden="true" />
      {processSteps.map((step) => (
        <li key={step.number} className="relative border-l border-line pl-6 lg:border-l-0 lg:pl-0">
          <span className="relative z-10 inline-flex bg-ivory pr-3 font-serif text-4xl text-olive lg:pr-4">
            {step.number}
          </span>
          <h3 className="mt-5 font-serif text-[1.85rem]">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-walnut">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

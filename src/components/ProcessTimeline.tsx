import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  return (
    <ol className="relative grid gap-12 md:grid-cols-5 md:gap-6">
      <div className="absolute top-5 right-0 left-0 hidden h-px bg-stone md:block" aria-hidden="true" />
      {processSteps.map((step) => (
        <li key={step.number} className="relative border-l border-stone pl-6 md:border-l-0 md:pl-0">
          <span className="relative z-10 inline-flex bg-ivory pr-3 font-serif text-4xl text-olive md:bg-ivory md:pr-4">
            {step.number}
          </span>
          <h3 className="mt-5 font-serif text-3xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

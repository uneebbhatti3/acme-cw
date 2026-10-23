import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

/** Manufacturing stages: a true sequence, so the steps are numbered. */
export function ProcessSteps({ steps }: { steps: { icon: string; title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={(i % 4) * 0.08} className="relative">
          <span className="relative inline-flex size-12 items-center justify-center rounded-full border border-steel-300/40 bg-ink text-legacy-accent">
            <Icon name={s.icon} className="size-5" />
          </span>
          <p className="mt-6 font-mono text-xs text-steel-300">
            <span className="sr-only">Step </span>
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="text-h3 mt-1 text-white">{s.title}</h3>
          <p className="mt-3 max-w-xs leading-relaxed text-steel-300">{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

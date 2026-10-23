import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "paper" | "white" | "ink" | "steel";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  white: "bg-white",
  ink: "on-dark bg-ink text-steel-300",
  steel: "bg-steel-100/60",
};

/** Page section with the standard vertical rhythm (48 / 64 / 96 px). */
export function Section({
  tone = "paper",
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; containerClassName?: string }) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-24", tones[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

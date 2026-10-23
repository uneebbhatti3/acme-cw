import { ExternalLink, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { certificationsCopy } from "@/data/copy";
import { cn } from "@/lib/utils";
import type { Certification } from "@/types";

function Badge({ cert }: { cert: Certification }) {
  return (
    <div className="flex h-full items-start gap-4 rounded-2xl border bg-card p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary-deep">
        <FileCheck aria-hidden className="size-5" strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <span className="block text-lg font-semibold leading-snug">{cert.name}</span>
        {cert.description && (
          <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{cert.description}</span>
        )}
        {!cert.file && <span className="mt-2 block text-xs text-muted-foreground">{certificationsCopy.status}</span>}
      </span>
    </div>
  );
}

/**
 * Certificate badges. Hovering shows the full description; a badge with a
 * document opens it in a dialog. Names come from data and must match the
 * client's verified certificates.
 */
export function Certifications({ items, className }: { items: Certification[]; className?: string }) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((cert) => (
        <li key={cert.name}>
          {cert.file ? (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="block h-full w-full rounded-2xl text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label={`${certificationsCopy.view}: ${cert.name}`}
                >
                  <Badge cert={cert} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl" closeLabel={certificationsCopy.close}>
                <div className="p-6 pr-16">
                  <DialogTitle className="font-display text-2xl">{cert.name}</DialogTitle>
                  {cert.description && <DialogDescription className="mt-2">{cert.description}</DialogDescription>}
                </div>
                <iframe src={cert.file} title={cert.name} loading="lazy" className="h-[70vh] w-full border-t bg-muted" />
                <div className="border-t p-4">
                  <Button asChild variant="outline" size="sm">
                    <a href={cert.file} target="_blank" rel="noopener noreferrer">
                      <ExternalLink aria-hidden />
                      {certificationsCopy.open}
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <HoverCard openDelay={150} closeDelay={80}>
              <HoverCardTrigger asChild>
                <div className="h-full">
                  <Badge cert={cert} />
                </div>
              </HoverCardTrigger>
              {cert.description && (
                <HoverCardContent className="w-80 rounded-2xl text-sm leading-relaxed">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="mt-1 text-muted-foreground">{cert.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{certificationsCopy.status}</p>
                </HoverCardContent>
              )}
            </HoverCard>
          )}
        </li>
      ))}
    </ul>
  );
}

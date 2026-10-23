"use client";

import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { whatsappHref } from "@/lib/utils";

/**
 * Floating WhatsApp link. On product pages the prefilled message names the
 * product. Hidden when no number is set in config.
 */
export function WhatsAppButton({ productNames }: { productNames: Record<string, string> }) {
  return <WhatsAppLink productNames={productNames} pathname={usePathname()} />;
}

export function WhatsAppLink({ productNames, pathname }: { productNames: Record<string, string>; pathname: string }) {
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;
  const slug = pathname.match(/^\/products\/[^/]+\/([^/]+)/)?.[1];
  const product = slug ? productNames[slug] : undefined;
  const text = product ? layoutCopy.whatsappProduct(product) : layoutCopy.whatsappText;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={whatsappHref(number, text)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${layoutCopy.whatsapp} (opens in a new tab)`}
          className="fixed bottom-4 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[var(--shadow-lift)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:bottom-6 md:right-6"
        >
          <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1c-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
          </svg>
        </a>
      </TooltipTrigger>
      <TooltipContent side="left" sideOffset={8}>
        {layoutCopy.whatsapp}
      </TooltipContent>
    </Tooltip>
  );
}

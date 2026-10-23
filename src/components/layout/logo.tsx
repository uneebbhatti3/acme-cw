import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The client's logo from config, linked home. On dark surfaces it can render
 * in white (`siteConfig.logo.invertOnDark`) so dark lettering stays readable.
 */
export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { logo, legalName } = siteConfig;
  return (
    <Link href="/" className={cn("inline-flex min-h-11 shrink-0 items-center rounded-md", className)}>
      <Image
        src={logo.src}
        alt={legalName}
        width={logo.width}
        height={logo.height}
        sizes="160px"
        className={cn("h-7 w-auto md:h-8", onDark && logo.invertOnDark && "brightness-0 invert")}
      />
    </Link>
  );
}

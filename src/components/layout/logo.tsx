import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Placeholder logo: a drafting centre mark beside the brand name from config.
 * Replace with the client's logo file when supplied.
 */
export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex min-h-11 items-center gap-2.5", onDark ? "text-white" : "text-ink", className)}
    >
      <Image src={"/logo.png"} alt="Acme Commercial Ways Ltd" width={150} height={150} />
    </Link>
  );
}

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0B1826] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="Acme"
              width={150}
              height={90}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Manufacturers Importers & Exporters of Surgical, Dental, Veterinary,
            Manicure Instruments & Scissors all sorts.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <p className="flex gap-2">
              <MapPin className="h-4 w-4 text-emerald-300" /> Manufacturing
              address placeholder
            </p>
            <p className="flex gap-2">
              <Mail className="h-4 w-4 text-emerald-300" /> info@acme-cw.com
            </p>
            <p className="flex gap-2">
              <Phone className="h-4 w-4 text-emerald-300" /> +92 52 3558738
            </p>
          </div>
        </div>
        <FooterCol
          title="Products"
          links={[
            ["Surgical Instruments", "/categories/surgical-instruments"],
            ["Dental Instruments", "/categories/dental-instruments"],
            ["Veterinary Instruments", "/categories/veterinary-instruments"],
            ["Manicure Instruments", "/categories/manicure-instruments"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["About", "/about"],
            ["Manufacturing", "/manufacturing"],
            ["Quality", "/quality"],
            ["Contact", "/contact"],
          ]}
        />
        <FooterCol
          title="Support"
          links={[
            ["Search", "/search"],
            ["Cart", "/cart"],
            ["Wishlist", "/wishlist"],
            ["Shipping & Returns", "/shipping-returns"],
          ]}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Precision Dental Instrument Works. Demo frontend.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span className="flex gap-2">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-4 w-4 text-slate-400 hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.676 0h-21.352c-.731 0-1.324.593-1.324 1.326v21.348c0 .733.593 1.326 1.324 1.326h11.495v-9.294h-3.131v-3.622h3.131v-2.671c0-3.1 1.892-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.324-.593 1.324-1.326v-21.349c0-.733-.594-1.326-1.325-1.326z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-4 w-4 text-slate-400 hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.976.976 1.247 2.244 1.309 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.364-.333 2.632-1.309 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.365-.062-2.633-.334-3.608-1.308-.975-.976-1.246-2.244-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.585.07-4.851c.062-1.364.333-2.632 1.308-3.608.975-.974 2.243-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.013-4.946.072-1.494.069-2.817.504-3.884 1.572s-1.504 2.389-1.572 3.884c-.059 1.279-.072 1.687-.072 4.946s.013 3.668.072 4.946c.068 1.495.504 2.817 1.572 3.885s2.39 1.504 3.884 1.572c1.279.059 1.687.072 4.946.072s3.668-.013 4.947-.072c1.494-.068 2.816-.504 3.884-1.572s1.504-2.39 1.572-3.885c.059-1.278.072-1.686.072-4.946s-.013-3.667-.072-4.946c-.068-1.495-.504-2.818-1.572-3.884s-2.39-1.504-3.884-1.572c-1.28-.059-1.688-.072-4.947-.072z" />
                  <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-4 w-4 text-slate-400 hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.227 0h-20.454c-.98 0-1.773.793-1.773 1.773v20.451c0 .981.793 1.773 1.773 1.773h20.451c.98 0 1.773-.792 1.773-1.773v-20.451c.001-.98-.792-1.773-1.772-1.773zm-14.538 20.452h-3.078v-9.256h3.078v9.256zm-1.539-10.554c-.984 0-1.781-.799-1.781-1.788 0-.991.797-1.79 1.781-1.79s1.78.799 1.78 1.79c0 .989-.796 1.788-1.78 1.788zm15.067 10.554h-3.077v-4.701c0-1.12-.021-2.56-1.561-2.56-1.56 0-1.798 1.217-1.798 2.477v4.784h-3.078v-9.256h2.957v1.266h.042c.413-.782 1.423-1.607 2.93-1.607 3.13 0 3.707 2.06 3.707 4.741v4.856z" />
                </svg>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="block text-sm text-slate-400 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

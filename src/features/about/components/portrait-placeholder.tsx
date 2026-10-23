import Image from "next/image";

/** 4:5 portrait slot: neutral head-and-shoulders outline until a photo is set. */
export function PortraitPlaceholder({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-steel-100">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-steel-100 to-[#D5DDE2]">
      <svg viewBox="0 0 200 250" className="absolute inset-0 size-full" role="img" aria-label={alt}>
        <circle cx="100" cy="98" r="38" fill="#F7F9FA" fillOpacity="0.6" stroke="#B8C2CA" strokeWidth="1.5" />
        <path
          d="M30 250 C34 186 64 160 100 160 C136 160 166 186 170 250 Z"
          fill="#F7F9FA"
          fillOpacity="0.6"
          stroke="#B8C2CA"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

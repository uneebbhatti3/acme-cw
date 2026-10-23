import type { ReactNode } from "react";
import { KindArt } from "../art/instrument-art";

/** Dark 16:9 poster with a faint instrument drawing, until real posters exist. */
export function VideoPoster({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-ink relative aspect-video w-full overflow-hidden">
      <div className="absolute inset-0 grid place-items-center p-[8%] opacity-30">
        <KindArt kind="forceps" />
      </div>
      {children}
    </div>
  );
}

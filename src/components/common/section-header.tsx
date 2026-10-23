export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      <p
        className={[
          "text-xs font-bold uppercase tracking-[0.22em]",
          inverted ? "text-emerald-300" : "text-teal-700",
        ].join(" ")}
      >
        {eyebrow}
      </p>

      <h2
        className={[
          "mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl",
          inverted ? "text-white" : "text-slate-950",
        ].join(" ")}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={[
            "mt-5 text-base leading-8",
            inverted ? "text-slate-300" : "text-slate-600",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

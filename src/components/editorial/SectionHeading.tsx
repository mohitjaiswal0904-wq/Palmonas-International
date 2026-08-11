import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  cta,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center text-center"
          : "flex flex-wrap items-end justify-between gap-4"
      }
    >
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="link-underline whitespace-nowrap font-sans text-[0.74rem] uppercase tracking-wide-sm text-ink"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}

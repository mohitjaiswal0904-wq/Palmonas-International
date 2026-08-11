import Image from "next/image";
import { artPlate, type PlateKind } from "@/lib/art";
import { cn } from "@/lib/cn";

/**
 * Media renders real photography when given an http(s) src, otherwise it
 * generates a refined seeded art plate. `seed` + `kind` control the placeholder
 * composition so each product reads distinctly.
 */
export function Media({
  src,
  alt,
  seed,
  kind = "editorial",
  className,
  sizes,
  priority,
  fill = true,
}: {
  src?: string;
  alt: string;
  seed: string;
  kind?: PlateKind;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const isReal = !!src && /^https?:\/\//.test(src);

  if (isReal) {
    return (
      <Image
        src={src!}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={artPlate(seed, kind)}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

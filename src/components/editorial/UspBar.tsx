import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeUsps } from "@/data";

export function UspBar() {
  return (
    <section className="border-t border-line py-8 sm:py-10" aria-label="Product promises">
      <Container>
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {homeUsps.map((usp) => (
              <li
                key={usp.id}
                className="flex h-9 items-center gap-1 rounded-full border border-[#fff0df] bg-surface py-1 pl-1 pr-3 sm:h-10 sm:pr-3.5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fff0df] sm:size-8">
                  <img
                    src={usp.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 object-contain"
                  />
                </span>
                <span className="whitespace-nowrap font-sans text-[0.68rem] uppercase tracking-wide-sm text-ink-muted sm:text-[0.72rem]">
                  {usp.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";

export function ProductDetails({ product }: { product: Product }) {
  const accordionItems = [
    {
      title: "Materials",
      content: (
        <ul className="space-y-1.5">
          {product.materials.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Craftsmanship",
      content: (
        <p>
          Hand-finished in our atelier. Every surface is polished by eye and
          every stone set by hand, then quality-checked against our house
          standard before it leaves us.
        </p>
      ),
    },
    { title: "Care", content: <p>{product.care}</p> },
    {
      title: "Shipping & returns",
      content: (
        <p>
          {product.deliveryEstimate}. Complimentary returns within 30 days in
          original condition. Each order arrives in signature packaging.
        </p>
      ),
    },
    {
      title: "Warranty",
      content: (
        <p>
          Covered by our lifetime craftsmanship warranty against manufacturing
          defects.
        </p>
      ),
    },
  ];

  return (
    <section className="border-t border-line py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
          {/* Lead + key facts — left rail */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Details</p>
            <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl">
              The piece, in full
            </h2>
            <p className="mt-6 font-sans text-[0.95rem] leading-relaxed text-ink-muted">
              {product.description}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Dimensions</dt>
                <dd className="mt-2.5 font-sans text-[0.88rem] leading-relaxed text-ink">
                  {product.dimensions}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Stone</dt>
                <dd className="mt-2.5 font-sans text-[0.88rem] leading-relaxed text-ink">
                  {product.stoneDetails}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Availability</dt>
                <dd className="mt-2.5 font-sans text-[0.88rem] leading-relaxed text-ink">
                  {product.availability === "made-to-order"
                    ? "Made to order"
                    : product.availability === "low-stock"
                      ? "Low stock"
                      : "In stock"}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Collection</dt>
                <dd className="mt-2.5 font-sans text-[0.88rem] leading-relaxed text-ink">
                  {product.collectionLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Spec accordion — right, full remaining width */}
          <div className="lg:col-span-7 lg:pt-1">
            <Accordion items={accordionItems} defaultOpen={0} />
          </div>
        </div>
      </Container>
    </section>
  );
}

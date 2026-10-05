"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { HOME_IMAGES } from "@/data";
import { easeEditorial } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative w-full bg-ink">
      <div className="relative h-[88dvh] min-h-[480px] w-full overflow-hidden sm:h-[92vh] sm:min-h-[560px]">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: easeEditorial }}
          className="absolute inset-0"
        >
          <Image
            src={HOME_IMAGES.hero}
            alt="Palmonas International campaign — the Nocturne collection"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/30" />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: easeEditorial }}
            className="font-sans text-[0.68rem] font-medium uppercase tracking-luxe text-surface/80"
          >
            The Nocturne Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: easeEditorial }}
            className="display-hero mt-3 max-w-[16ch] text-[2.75rem] leading-[1.05] text-surface sm:mt-4 sm:text-7xl lg:text-[5.5rem]"
          >
            Made to be worn.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: easeEditorial }}
            className="mt-4 max-w-[42ch] font-sans text-[0.95rem] font-light leading-relaxed text-surface/85 sm:mt-6 sm:text-lg"
          >
            Modern demi-fine jewellery for the days that become part of you —
            crafted to move, to last, and to never be locked away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: easeEditorial }}
            className="mt-5 w-full sm:mt-9 sm:w-auto"
          >
            <ButtonLink
              href="/jewellery"
              className="w-full border-surface/0 bg-surface text-ink hover:bg-surface hover:text-accent-deep sm:w-auto"
            >
              Discover the collection
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-1.5 bg-surface py-3.5"
        aria-hidden
      >
        <span className="size-[7px] rounded-full bg-ink" />
        <span className="size-[7px] rounded-full bg-line" />
        <span className="size-[7px] rounded-full bg-line" />
      </div>
    </section>
  );
}

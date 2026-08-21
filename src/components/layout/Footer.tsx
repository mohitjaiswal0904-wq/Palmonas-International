"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Wordmark";
import {
  footerAbout,
  footerCompany,
  footerDifferent,
  footerFaqs,
  footerGifting,
  footerIntro,
  footerLegalHref,
  footerLegalNote,
  footerLinkGroups,
  footerNewsletter,
  footerPopularSearches,
  footerShopByCategory,
  footerSocial,
  type FooterBlock,
  type FooterFaq,
  type FooterLink,
} from "@/data/content/footer";
import { easeOutSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SOCIAL_ICON = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
} as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="mt-16 border-t border-line bg-surface pb-safe sm:mt-24">
      {/* Brand / SEO copy */}
      <Container className="max-w-[880px] py-10 sm:py-14">
        <p className="font-sans text-[0.82rem] leading-relaxed text-ink-muted">
          {footerIntro.title}
        </p>
        <p className="mt-2 font-sans text-[0.82rem] leading-relaxed text-ink-faint">
          {footerIntro.lead}
        </p>

        <div className="mt-6 border-t border-line">
          <FooterDisclosure title={footerAbout.title}>
            <BlockBody block={footerAbout} />
          </FooterDisclosure>
          <FooterDisclosure title={footerShopByCategory.title}>
            <BlockBody block={footerShopByCategory} />
          </FooterDisclosure>
          <FooterDisclosure title={footerDifferent.title}>
            <BlockBody block={footerDifferent} />
          </FooterDisclosure>
          <FooterDisclosure title={footerGifting.title}>
            <BlockBody block={footerGifting} />
          </FooterDisclosure>
          <FooterDisclosure title="Frequently asked questions">
            <FaqList items={footerFaqs} />
          </FooterDisclosure>
        </div>

        <p className="mt-6 font-sans text-[0.82rem] leading-relaxed text-ink-faint">
          {footerIntro.closing}{" "}
          <Link
            href={footerIntro.exploreHref}
            className="text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            {footerIntro.exploreLabel}
          </Link>
          .
        </p>
      </Container>

      {/* Newsletter, company, nav */}
      <div className="border-t border-line">
        <Container className="py-10 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-serif text-xl leading-snug text-ink sm:text-2xl">
                {footerNewsletter.title}
              </p>
              {sent ? (
                <p className="mt-5 font-sans text-[0.82rem] text-success" role="status">
                  Thank you — welcome to the house.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSent(true);
                  }}
                  className="mt-5"
                >
                  <div className="flex h-12 items-stretch border border-line">
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={footerNewsletter.placeholder}
                      aria-label={footerNewsletter.placeholder}
                      className="min-w-0 flex-1 bg-transparent px-4 font-sans text-[0.86rem] text-ink placeholder:text-ink-faint focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="inline-flex w-[4.25rem] shrink-0 items-center justify-center border-l border-line text-ink transition-colors hover:bg-stone/60 hover:text-accent-deep"
                    >
                      <Mail size={18} strokeWidth={1.4} />
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-8">
                <p className="font-sans text-[0.95rem] font-medium text-ink">
                  {footerCompany.name}
                </p>
                <p className="mt-1 font-sans text-[0.78rem] leading-relaxed text-ink-muted">
                  <span className="font-medium">{footerCompany.addressLabel}</span>{" "}
                  {footerCompany.address}
                </p>
              </div>
            </div>

            <div>
              {/* Mobile: accordion links · Desktop: open columns */}
              <div className="border-t border-line lg:hidden">
                {footerLinkGroups.map((group) => (
                  <FooterDisclosure key={group.title} title={group.title} tone="nav">
                    <LinkList links={group.links} />
                  </FooterDisclosure>
                ))}
              </div>
              <div className="hidden gap-10 lg:grid lg:grid-cols-3">
                {footerLinkGroups.map((group) => (
                  <nav key={group.title} aria-label={group.title}>
                    <p className="eyebrow mb-4">{group.title}</p>
                    <LinkList links={group.links} />
                  </nav>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8 border-t border-line pt-10">
            <div className="flex items-center justify-center gap-2.5">
              {footerSocial.map((s) => {
                const Icon = SOCIAL_ICON[s.label];
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-muted text-ink-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </Link>
                );
              })}
            </div>

            <Link
              href={footerLegalHref}
              className="font-sans text-[0.72rem] text-ink-muted transition-colors hover:text-ink"
            >
              {footerLegalNote}
            </Link>

            <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
              <Wordmark size="sm" />
              <p className="font-sans text-[0.68rem] text-ink-faint">
                © {new Date().getFullYear()} Palmonas International
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Popular searches */}
      <div className="border-t border-line bg-ivory">
        <Container className="py-8 sm:py-10">
          <p className="font-serif text-xl text-ink sm:text-2xl">Popular Searches</p>
          <div className="mt-4">
            {footerPopularSearches.map((group) => (
              <div key={group.title} className="border-b border-line py-3">
                <p className="font-sans text-[0.82rem] text-ink-muted">{group.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-sans text-[0.82rem] leading-relaxed text-ink-faint">
                  {group.links.map((link, i) => (
                    <span key={link.label} className="inline-flex items-center gap-1.5">
                      {i > 0 && <span className="text-line-strong" aria-hidden>|</span>}
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterDisclosure({
  title,
  children,
  tone = "copy",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "copy" | "nav";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const btnId = `${id}-btn`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between gap-4 text-left",
            tone === "nav" ? "py-3.5" : "py-3",
          )}
        >
          <span
            className={cn(
              "font-sans text-ink",
              tone === "nav"
                ? "text-[0.95rem] font-medium"
                : "text-[0.82rem] text-ink-muted",
            )}
          >
            {title}
          </span>
          <ChevronDown
            size={tone === "nav" ? 14 : 12}
            strokeWidth={1.5}
            className={cn(
              "shrink-0 text-ink-faint transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutSoft }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlockBody({ block }: { block: FooterBlock }) {
  return (
    <div className="space-y-3 font-sans text-[0.82rem] leading-relaxed text-ink-faint">
      {block.paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {block.list && (
        <>
          <p className="pt-1 text-ink-muted">Our materials speak for themselves:</p>
          <ul className="list-disc space-y-1 pl-4">
            {block.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {block.italic && <p className="italic">{block.italic}</p>}
      {block.sections?.map((section) => (
        <div key={section.title} className="space-y-1.5 pt-2 first:pt-0">
          <p className="text-ink-muted">{section.title}</p>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function FaqList({ items }: { items: FooterFaq[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="border-t border-line/70">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-line/70 last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-start justify-between gap-3 py-2.5 text-left"
            >
              <span className="font-sans text-[0.82rem] leading-snug text-ink-muted">
                {item.question}
              </span>
              <ChevronDown
                size={12}
                strokeWidth={1.5}
                className={cn(
                  "mt-1 shrink-0 text-ink-faint transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOutSoft }}
                  className="overflow-hidden"
                >
                  <p className="pb-3 font-sans text-[0.82rem] leading-relaxed text-ink-faint">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-0.5">
      {links.map((l) => {
        const external = l.href.startsWith("http");
        return (
          <li key={l.label}>
            {external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 font-sans text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="inline-block py-1.5 font-sans text-[0.82rem] text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
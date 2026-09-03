#!/usr/bin/env node
/**
 * Automated Figma html-to-design capture via Playwright.
 * Usage:
 *   node scripts/figma-auto-capture.mjs <captureId> <path>
 *   node scripts/figma-auto-capture.mjs <captureId> <path> --overlay <name>
 * Viewport: 1728×1117 desktop (default) or 400×844 mobile via env/--profile mobile
 */
import { chromium } from "playwright";

const BASE = process.env.FIGMA_CAPTURE_BASE ?? "http://localhost:3000";
const profileIdx = process.argv.indexOf("--profile");
const profile = profileIdx >= 0 ? process.argv[profileIdx + 1] : null;
const isMobileProfile = profile === "mobile" || process.env.FIGMA_CAPTURE_PROFILE === "mobile";
const VIEWPORT = {
  width: Number(process.env.FIGMA_CAPTURE_WIDTH ?? (isMobileProfile ? 400 : 1728)),
  height: Number(process.env.FIGMA_CAPTURE_HEIGHT ?? (isMobileProfile ? 844 : 1117)),
};
const CAPTURE_JS = "https://mcp.figma.com/mcp/html-to-design/capture.js";

const rawArgs = process.argv.slice(2).filter((arg, i, arr) => {
  if (arg === "--profile") return false;
  if (i > 0 && arr[i - 1] === "--profile") return false;
  return true;
});
const overlayIdx = rawArgs.indexOf("--overlay");
const overlay = overlayIdx >= 0 ? rawArgs[overlayIdx + 1] : null;
const captureArgs = overlayIdx >= 0 ? rawArgs.slice(0, overlayIdx) : rawArgs;
const [captureId, pathArg = "/"] = captureArgs;

if (!captureId) {
  console.error(
    "Usage: node scripts/figma-auto-capture.mjs <captureId> <path> [--overlay cart|wishlist|search|mega-menu|menu|account|filters] [--profile mobile]",
  );
  process.exit(1);
}

const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit?bindVariables=true`;
const pathWithQuery = pathArg.startsWith("/") ? pathArg : `/${pathArg}`;
const url = `${BASE}${pathWithQuery}${pathWithQuery.includes("?") ? "&" : "?"}figmaCapture=1`;
const urlHasOverlaySeed = url.includes("figmaOverlay=");
const needsCartSeed = url.includes("figmaSeed=cart");

const CART_SEED_STORAGE = {
  state: {
    lines: [
      {
        key: "beat-drop-bracelet::925 Sterling Silver::Cubic Zirconia::",
        productId: "beat-drop-bracelet",
        name: "925 Sterling Silver Beat Drop Bracelet",
        slug: "925-sterling-silver-beat-drop-bracelet",
        category: "bracelets",
        price: 2499,
        currency: "USD",
        metalLabel: "925 Sterling Silver",
        stoneLabel: "Cubic Zirconia",
        size: "Standard",
        image: "/products/beat-drop-bracelet-1.jpg",
        seed: "beat-drop-bracelet",
        plate: "silver",
        quantity: 1,
        giftWrap: false,
      },
    ],
  },
  version: 0,
};

async function clickVisible(page, selector) {
  const loc = page.locator(selector);
  const count = await loc.count();
  for (let i = count - 1; i >= 0; i--) {
    const el = loc.nth(i);
    if (await el.isVisible()) {
      await el.click();
      return;
    }
  }
  throw new Error(`No visible element for ${selector}`);
}

async function preparePageForCapture(page) {
  await page.waitForLoadState("networkidle").catch(() => {});

  // Hero fade-in + font loading
  await page.waitForTimeout(2500);

  // Trigger whileInView reveals by scrolling the full page
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const max = document.documentElement.scrollHeight;
    for (let y = 0; y <= max; y += window.innerHeight * 0.75) {
      window.scrollTo(0, y);
      await delay(450);
    }
    window.scrollTo(0, 0);
    await delay(600);
  });

  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-delay: 0ms !important;
        transition-duration: 0.001ms !important;
        transition-delay: 0ms !important;
      }
      .link-underline {
        background-image: none !important;
      }
    `;
    document.head.appendChild(style);

    document.querySelectorAll("*").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("visibility", "visible", "important");
      el.style.setProperty("filter", "none", "important");
    });
  });

  await page
    .waitForFunction(
      () =>
        [...document.images].every(
          (img) => img.complete && (img.naturalWidth > 0 || img.src.startsWith("data:")),
        ),
      { timeout: 30_000 },
    )
    .catch(() => {});

  await page.waitForTimeout(1200);
}

async function scrollToBottomForStickyBars(page, pathArg) {
  const needsBottom =
    pathArg.includes("/jewellery/") ||
    pathArg.includes("/checkout/") ||
    pathArg.includes("figmaOverlay=filters");
  if (!needsBottom) return;

  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    window.scrollTo(0, document.documentElement.scrollHeight);
    await delay(800);
    window.scrollTo(0, 0);
    await delay(400);
  });
}

async function openOverlay(page, kind) {
  switch (kind) {
    case "cart":
      await clickVisible(page, 'header button[aria-label*="Bag" i], header button[aria-label*="cart" i]');
      break;
    case "wishlist":
      await clickVisible(page, 'header button[aria-label*="Wishlist" i], header button[aria-label*="heart" i]');
      break;
    case "search":
      await clickVisible(page, 'header button[aria-label="Search"], header button[aria-label*="search" i]');
      break;
    case "account":
      await clickVisible(page, 'header button[aria-label="Account"], header button[aria-label*="account" i], header button[aria-label*="user" i]');
      break;
    case "mega-menu":
      await page.getByRole("link", { name: "Demifine ® Collection" }).first().hover();
      break;
    case "menu":
      await clickVisible(page, 'button[aria-label="Open menu"]');
      break;
    case "filters":
      await page.getByRole("button", { name: /filter/i }).click().catch(() => clickVisible(page, "text=Filters"));
      break;
    default:
      throw new Error(`Unknown overlay: ${kind}`);
  }
  await page.waitForTimeout(1500);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: VIEWPORT });

try {
  if (needsCartSeed) {
    await page.addInitScript((storage) => {
      window.localStorage.setItem("palmonas-cart", JSON.stringify(storage));
    }, CART_SEED_STORAGE);
  }

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  const seedWait = url.includes("figmaSeed=") ? 3000 : 0;
  if (seedWait) await page.waitForTimeout(seedWait);

  if (overlay && !urlHasOverlaySeed) await openOverlay(page, overlay);
  else if (overlay) await page.waitForTimeout(1500);

  await preparePageForCapture(page);
  await scrollToBottomForStickyBars(page, pathArg);

  const scriptRes = await page.context().request.get(CAPTURE_JS);
  const scriptText = await scriptRes.text();
  await page.evaluate((s) => {
    const el = document.createElement("script");
    el.textContent = s;
    document.head.appendChild(el);
  }, scriptText);

  await page.waitForFunction(() => typeof window.figma?.captureForDesign === "function", {
    timeout: 30_000,
  });
  await page.waitForTimeout(1000);

  const result = await Promise.race([
    page.evaluate(
      ({ captureId, endpoint }) =>
        window.figma.captureForDesign({
          captureId,
          endpoint,
          selector: "body",
        }),
      { captureId, endpoint },
    ),
    new Promise((resolve) => setTimeout(() => resolve({ submitted: true }), 90_000)),
  ]);

  console.log(JSON.stringify({ ok: true, captureId, url, overlay, viewport: VIEWPORT, result }));
} catch (err) {
  console.error(JSON.stringify({ ok: false, captureId, url, overlay, error: String(err) }));
  process.exit(1);
} finally {
  await browser.close().catch(() => {});
  process.exit(0);
}

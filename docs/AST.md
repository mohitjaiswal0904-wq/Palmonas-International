# Abstract Syntax Tree — storefront entry

Condensed AST of the main modules (TypeScript / JSX node kinds).  
Not a full-project parse — layout chrome, home page, catalogue builder, Zustand factories.

```mermaid
flowchart TD
    program(["Program"]) --> layoutMod["Module: app/layout.tsx"]
    program --> pageMod["Module: app/page.tsx"]
    program --> dataMod["Module: data/catalog/products.ts"]
    program --> storesMod["Module: stores/*.ts"]

    layoutMod --> layoutFn["FunctionDeclaration: RootLayout"]
    layoutFn --> layoutJsx["JSXElement: html > body > SiteChrome"]
    layoutJsx --> drawers["JSXElement*: CartDrawer · WishlistDrawer · …"]

    pageMod --> pageFn["FunctionDeclaration: HomePage"]
    pageFn --> pageReturn["ReturnStatement"]
    pageReturn --> frag["JSXFragment"]
    frag --> hero["JSXElement: Hero"]
    frag --> sections["JSXElement*: section"]
    frag --> rail["JSXElement: ProductRail"]

    dataMod --> mapCall["CallExpression: productSeeds.map"]
    mapCall --> seeds["ArrayExpression: productSeeds"]
    seeds --> ode["Identifier: odeToNatureSeeds"]
    seeds --> gold["Identifier: nineKtFineGoldSeeds"]
    seeds --> ess["Identifier: essentialSeeds"]
    mapCall --> build["Function: buildProduct"]
    dataMod --> enrich["CallExpression: enrichCatalogRelations"]

    storesMod --> createCart["CallExpression: create → useCart"]
    storesMod --> createWish["CallExpression: create → useWishlist"]
    storesMod --> createUi["CallExpression: create → useUi"]
```

FigJam: claim from the agent-generated board linked in chat.  
Interactive canvas: `ast-diagram.canvas.tsx` in the Cursor canvases folder.

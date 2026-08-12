# Skill: Product Image Refresh

Trigger: "Touch up the images for the {PRODUCT} to fit the website aesthetic" (or any request to
generate a new image set for a product).

## Goal
Taking inspiration from the product's existing store images, generate 8 new editorial images that
match the DESK.CO aesthetic and show every colour variation available for purchase.

## Required set (exactly 8)
- 1 x the product with all included items
- 2 x the product at different angles
- 3 x daily use cases
- 2 x infographics

## Hard constraints
- Do NOT change the website code and do NOT change the Wix product.
- Do NOT redesign the product: the shape, materials, proportions, branding and finish must stay
  exactly as in the existing store photos. Always pass 1-2 existing store images as reference.

## Steps
1. Fetch the product from Wix. Working call: `POST https://www.wixapis.com/stores/v3/products/search`
   with body `{"search":{"cursorPaging":{"limit":100}},"fields":["MEDIA_ITEMS_INFO","DESCRIPTION"]}`
   using the `wix` connector token, then match the product by name. Collect:
   - existing media URLs (use as visual reference for shape, packaging, included items)
   - the colour options actually available for purchase (variant/option values)
   - included accessories from the description (cables, rolls, guides, etc.)
2. Generate exactly 8 images, using the existing photos as reference images:
   - 1 x flat-lay of the product with ALL included items
   - 2 x product-only shots at different angles (e.g. three-quarter front, side/rear profile)
   - 3 x daily use cases (real desk / hand-held / in-situ moments, no faces required)
   - 2 x photo-led infographics (editorial product photography with typographic overlays, e.g.
     "How it works", "Colours", "Ways to use it")
   - The colour range available for purchase must be visible across the set (a colour line-up shot
     or a "Colours" infographic). If the product has no colour options in Wix, keep the whole set in
     its single finish and say so in the reply.
   - Generate the 8 images in parallel batches to keep it fast.
3. Present all 8 images in the chat. Do NOT change the website or the Wix product unless the user
   asks in a follow-up.

## Aesthetic rules (must appear in every prompt)
- Background: cream #F2EDE3, flat and seamless.
- Palette: cream base, charcoal #1C1C1E text, restrained maroon #6B1A2A / amber #C4932A accents only.
- Soft diffused daylight, gentle natural shadows, no harsh specular highlights.
- Editorial catalogue styling, square 1:1 framing, generous negative space, product centred.
- Muted premium props only (paper, linen, matte ceramic, light timber). No clutter, no gradients,
  no neon, no stock-photo gloss.
- Typography on infographics: clean grotesque sans, charcoal, uppercase labels with wide tracking,
  minimal words. No em dashes. No hype words, no sale badges, no starbursts, no price callouts.
- No brand logos other than DESK.CO, no watermarks, no red banner sale graphics.

## Prompt template
"Editorial product photograph of {PRODUCT} in {COLOUR(S)}, {SHOT DESCRIPTION}, flat seamless cream
#F2EDE3 background, soft diffused daylight, gentle natural shadow, square catalogue framing with
generous negative space, muted premium styling, charcoal #1C1C1E accents, no text, no logos,
photorealistic, high detail."

For infographics append: "with minimal uppercase charcoal grotesque labels and thin rule lines,
clean editorial infographic layout, no hype language."

## Output
Reply with the 8 images and a one-line note of what each shows. Ask before touching the live
product gallery.
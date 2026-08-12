# Skill: Product Image Refresh

Trigger: "Touch up the images for the {PRODUCT} to fit the website aesthetic" (or any request to
generate a new image set for a product).

## Goal
Using the product's existing store images as reference, generate 8 new editorial images that match
the DESK.CO aesthetic and show every colour variation available for purchase.

## Steps
1. Fetch the product from Wix (`wixProducts` function or the Stores v3 API) to collect:
   - existing media URLs (use as visual reference for shape, packaging, included items)
   - the colour options actually available for purchase (variant/option values)
   - included accessories from the description (cables, rolls, guides, etc.)
2. Generate exactly 8 images, using the existing photos as reference images:
   - 1 x flat-lay of the product with ALL included items
   - 2 x product-only shots at different angles (e.g. three-quarter front, side/rear profile)
   - 3 x daily use cases (real desk / hand-held / in-situ moments, no faces required)
   - 2 x photo-led infographics (editorial product photography with typographic overlays, e.g.
     "How it works", "Colours", "Ways to use it")
   - The colour range must be visible across the set (a colour line-up shot or infographic).
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
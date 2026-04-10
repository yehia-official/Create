# Design System: The Editorial Precision Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Architect’s Ledger"**

This design system moves away from the generic "SaaS-blue" template and moves toward a high-end, editorial experience that feels both authoritative and approachable. It is defined by **The Architect’s Ledger**—a philosophy that treats digital space like a premium printed publication. 

Instead of relying on rigid boxes and heavy borders, we utilize **intentional asymmetry, expansive white space, and tonal layering**. The brand personality is "Calculated Confidence"—it doesn't need to shout with loud strokes because its structure and typography command the room. We break the "template" look by overlapping elements across soft background shifts, creating a sense of depth that feels architectural rather than flat.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

The palette is anchored by a deep navy (`#1A2033`) and a vibrant, functional blue (`#2563EB`), punctuated by an authoritative gold (`#FACC15`). 

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To move beyond "standard" UI, boundaries must be defined solely through background color shifts. 
*   **Implementation:** A `surface-container-low` section should sit directly against a `surface` background. The transition between colors *is* the divider.
*   **Signature Textures:** For primary CTAs or Hero backgrounds, use a subtle linear gradient from `primary` (#004AC6) to `primary_container` (#2563EB) at a 135-degree angle. This adds a "soul" to the color that flat hex codes cannot achieve.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `surface` (#F9F9F9)
*   **De-emphasized zones:** `surface_container_low` (#F4F3F3)
*   **Active/Elevated zones:** `surface_container_highest` (#E2E2E2)
*   **The Glass Rule:** For floating navigation or modals, use `surface_container_lowest` (#FFFFFF) at 85% opacity with a `24px` backdrop blur. This ensures the UI feels integrated into the environment.

---

## 3. Typography: The Editorial Scale

We pair the geometric clarity of **Plus Jakarta Sans** for display with the high-readability of **Inter** for utility. (Note: These replace the base PT Sans/Poppins with more premium, variable-weight alternatives that maintain the original's spirit).

*   **Display (Plus Jakarta Sans):** Used for "The Big Idea." Large, bold, and slightly tight letter-spacing (-0.02em). It conveys the brand’s "Architectural" strength.
*   **Headline & Title (Plus Jakarta Sans):** These act as the anchors of your information hierarchy.
*   **Body & Labels (Inter):** Optimized for long-form reading and data density. 

**The Editorial Shift:** Use `display-lg` (3.5rem) in close proximity to `body-md` (0.875rem). This high-contrast scale ratio creates the "Editorial" feel—emphasizing the hierarchy of information over a uniform grid.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are often a crutch for poor layout. This system prioritizes **Tonal Layering**.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a "soft lift" that is felt rather than seen.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use a multi-layered blur: 
    *   `box-shadow: 0 4px 20px rgba(26, 32, 51, 0.04), 0 12px 40px rgba(26, 32, 51, 0.08);`
    *   The shadow is tinted with the `on_surface` color, never pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in a high-density form), use the `outline_variant` at **15% opacity**. 100% opaque borders are strictly forbidden.

---

## 5. Components: Style & Execution

### Buttons
*   **Primary:** A gradient-filled container (`primary` to `primary_container`) with `on_primary` text. Use `md` (0.75rem) corner radius.
*   **Secondary:** No fill, no border. Use a `surface_container_high` background on hover.
*   **Tertiary/Ghost:** Text-only with an underline that appears on hover, moving 2px upward.

### Cards & Lists
*   **Constraint:** Zero dividers. 
*   **Execution:** Use `40px` of vertical white space to separate list items. For cards, use a `surface_container_lowest` background with a `lg` (1rem) corner radius.
*   **Interactions:** On hover, a card should not "pop" with a shadow; it should shift its background color to `surface_bright`.

### Input Fields
*   **Layout:** Use "Floating Labels" that sit on a `surface_container_low` background. 
*   **State:** When active, the field should transition from `surface_container_low` to `surface_container_lowest` with a 2px `primary` underline—no full-box stroke.

### Specialized Component: The "Editorial Tag"
*   **Usage:** For categories or status.
*   **Style:** `tertiary_fixed` (#FFE083) background with `on_tertiary_fixed` (#231B00) text. All caps, `label-sm` weight, `full` (9999px) radius.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Align a headline to the left but push the body text 2 columns to the right.
*   **Embrace Negative Space:** If a section feels "empty," leave it. Do not fill space with decorative lines.
*   **Trust the Tones:** Let the subtle shift from `#F9F9F9` to `#EEEEEE` do the work of a border.

### Don’t:
*   **Use Heavy Shadows:** Avoid anything that looks like a "Material Design 1.0" floating action button.
*   **Use 1px Borders:** Never use `#E0E0E0` as a solid 1px stroke around a box. 
*   **Over-center:** Center-aligned text should be reserved for short, 2-line max "Display" moments. Everything else follows a rigorous, editorial left-aligned grid.
*   **Crowd the Type:** Never let a headline touch a container edge. Maintain at least `xl` (1.5rem) padding.

---
**Director's Note:** Every pixel must feel intentional. If an element exists, it should be there because the information hierarchy demands it, not because the grid suggests it. Build with air, depth, and precision.```

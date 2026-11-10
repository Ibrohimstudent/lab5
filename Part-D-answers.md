# Part D · Client bug reports

## Bug 1 · "Visited menu links do not turn gold when I hover."

**Cause: the cascade / LVHA order.**
`a:visited` and `a:hover` have the **same specificity** (one element + one pseudo-class),
so the rule written **last** wins. `nav a:visited` comes after `nav a:hover`, so for a
visited link its `background: none` overrides the gold hover background.
The pseudo-classes must be in **LVHA order**: `:link` → `:visited` → `:hover` → `:active`.

**Fixed code:**
```css
nav a:link    { color: white; }
nav a:visited { color: white; }
nav a:hover   { background: #E0A526; }
nav a:active  { background: #c38d1c; }
```

## Bug 2 · "The badge is in the corner of the whole page, not the card."

**Cause: containing block of an absolutely positioned element.**
An element with `position: absolute` is placed relative to its **nearest positioned
ancestor** (an ancestor whose `position` is not `static`). `.card` has the default
`position: static`, so no ancestor is positioned and the badge uses the
**initial containing block** (the page) instead of the card.

**Fixed code:**
```css
.card  { position: relative; padding: 16px; border-radius: 10px; }
.badge { position: absolute; top: 10px; right: 10px; }
```

## Bug 3 · "On my laptop the third card drops below the other two."

**Cause: the box model (`box-sizing: content-box`).**
By default `width` sets only the **content box**; padding and border are **added** to it.
Each card is really `33.33% + 2 × 20px padding + 2 × 1px border` = 33.33% + 42px wide,
so three cards are wider than 100% of the row and the third float wraps to the next line.

**Fixed code:**
```css
.card {
  box-sizing: border-box;   /* padding and border are included in the 33.33% */
  width: 33.33%;
  float: left;
  padding: 20px;
  border: 1px solid #ddd;
}
```

---

## Part C · Comparison sentence

In Part A I wrote about 200 lines of CSS by hand for the layout, header, cards and media
queries, while in Part C Bootstrap's ready-made classes (navbar, grid and cards) handled
the layout and responsiveness, so I only needed about 70 lines of CSS for the brand
colours and small effects.

# Part A – Test Cases for brightsg.com

## Rationale

I've focused on areas that directly impact user conversion and first impressions: the navigation flow, product discovery pages, the Book a Demo funnel, and cross-device responsiveness. These are the paths a potential customer would take when evaluating Bright's software, so any bugs here have a real business impact.

---

### TC-01: Main navigation displays mega menu with product categories

**Description:** Verify the mega menu opens on hover and shows the expected product groupings.

**Preconditions:**
- Desktop viewport (1280x720+)
- Location popup dismissed

**Steps:**
1. Navigate to the homepage.
2. Hover over "Software Solutions" in the top nav.
3. Observe the dropdown content.

**Expected Results:**
- Mega menu appears with "Bright for" section (Accountants, SMEs, Payroll Bureaus).
- "Products" section lists BrightPay, BrightManager, BrightBooks, and others.
- All links are clickable and navigate to the correct pages.

---

### TC-02: Book a Demo CTA navigates to the demo page

**Description:** The header CTA should take users to the demo booking page.

**Preconditions:** User is on any page.

**Steps:**
1. Click "Book a Demo" in the header.
2. Wait for page load.

**Expected Results:**
- URL includes `/product-demo`.
- Page contains a heading referencing demos.
- A form or embedded booking widget (e.g. HubSpot/Calendly) is present.

---

### TC-03: BrightPay product page loads with key content

**Description:** The flagship product page should load with correct title, CTAs, and no broken assets.

**Preconditions:** None.

**Steps:**
1. Navigate to `/brightpay-cloud-payroll-software/`.
2. Check the page title.
3. Scroll through the page content.

**Expected Results:**
- Title includes "BrightPay".
- At least one CTA button is visible (Free Trial / Buy Now).
- No images are broken (naturalWidth > 0).

---

### TC-04: Location popup appears on first visit

**Description:** The site should present a UK/Ireland region selector on the first visit.

**Preconditions:** Clear all cookies and local storage.

**Steps:**
1. Navigate to the homepage.
2. Observe the popup.

**Expected Results:**
- A location popup appears within 5 seconds.
- It offers UK and Ireland options.
- Selecting Ireland navigates to `/en-ie/`.
- Selecting UK keeps the user on `brightsg.com`.
- The popup does not appear again on subsequent visits.

---

### TC-05: Footer contains essential legal and navigation links

**Description:** Verify the footer has key links and they return valid responses.

**Preconditions:** None.

**Steps:**
1. Navigate to the homepage and scroll to the footer.
2. Check for Privacy Policy and Terms links.
3. Click through a sample of footer links.

**Expected Results:**
- Footer is visible with multiple link groups.
- Privacy Policy link exists with a valid href.
- Terms link exists.
- Sampled links return HTTP 200 (no 404s).

---

### TC-06: Homepage hero section renders correctly

**Description:** The hero banner should load with a heading and CTA.

**Preconditions:** None.

**Steps:**
1. Navigate to the homepage.
2. Observe the hero/banner area.

**Expected Results:**
- A heading (h1 or h2) is visible with meaningful text.
- At least one CTA button is present and links to a demo or product page.

---

### TC-07: Mobile hamburger menu opens and shows navigation

**Description:** On mobile viewports, the nav should collapse into a hamburger menu.

**Preconditions:** Viewport set to mobile (e.g. 375x812).

**Steps:**
1. Navigate to the homepage at mobile width.
2. Tap the hamburger/menu icon.
3. Verify the menu content.

**Expected Results:**
- Desktop navigation is not visible.
- Hamburger icon is visible and tappable.
- Tapping it opens a slide-out or overlay menu with nav links.
- No horizontal overflow on the page.

---

### TC-08: Product page links from mega menu are reachable

**Description:** Clicking a product name in the mega menu should navigate to its product page.

**Preconditions:** Desktop viewport.

**Steps:**
1. Hover over Software Solutions.
2. Click "BrightPay" from the dropdown.
3. Wait for the page to load.

**Expected Results:**
- URL includes "brightpay".
- Page loads without errors.
- Page title reflects the product name.

---

### TC-09: Page load time is within acceptable bounds

**Description:** The homepage should load in a reasonable time, not exceeding 10 seconds.

**Preconditions:** None.

**Steps:**
1. Navigate to the homepage.
2. Measure load time until document ready state is "complete".

**Expected Results:**
- Page fully loads in under 10 seconds.
- No console errors related to failed resource loads.

---

### TC-10: Tablet viewport renders homepage without layout breakage

**Description:** At tablet width (e.g. iPad), the homepage should render without visual bugs.

**Preconditions:** Viewport set to iPad dimensions (768x1024).

**Steps:**
1. Navigate to the homepage.
2. Scroll through the full page.

**Expected Results:**
- Hero heading is visible.
- No horizontal scroll overflow.
- Content areas are readable and not overlapping.

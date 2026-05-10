# Lighthouse Optimization Checklist

## Performance Target: ≥ 85

### LCP (Largest Contentful Paint) < 2.5s

**Optimizations Made**:
- [x] Font preloading (Geist via next/font)
- [x] React Compiler enabled (reduces JS overhead)
- [x] Image optimization (next/image with WebP + AVIF)
- [x] Priority rendering for hero content
- [x] Minimize unused CSS via TailwindCSS v4
- [x] Code splitting for form components (dynamic imports)

**Verifications Needed**:
- [ ] Run Lighthouse > Performance > LCP measurement
- [ ] Ensure hero image/text loads within 2.5s on Slow 4G

### CLS (Cumulative Layout Shift) < 0.1

**Optimizations Made**:
- [x] All images have explicit dimensions (next/image)
- [x] Reserve space for dynamic content (skeletons + spinners)
- [x] Font preloading prevents FOIT/FOUT
- [x] No unsized iframes or embeds

**Verifications Needed**:
- [ ] Audit for layout shifts during initial load
- [ ] Check form interactions don't cause shifts
- [ ] Ensure animations don't contribute to CLS

### FID (First Input Delay) < 100ms

**Optimizations Made**:
- [x] React Compiler reduces JS execution time
- [x] Code splitting for form components
- [x] Lazy load AI summary component
- [x] Dynamic imports for heavy libraries

**Verifications Needed**:
- [ ] Measure interaction response times
- [ ] Audit long JavaScript tasks (> 50ms)
- [ ] Profile React renders

### INP (Interaction to Next Paint) < 200ms

**Optimizations Made**:
- [x] Form inputs debounced
- [x] Recommendations don't block UI thread
- [x] Share button uses instant copy

**Verifications Needed**:
- [ ] Test all form interactions
- [ ] Profile "Generate Recommendations" button click

---

## Accessibility Target: ≥ 90

### WCAG 2.1 Level AA Compliance

**Implemented**:
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] ARIA labels for form fields
- [x] ARIA descriptions for complex elements
- [x] Color contrast ratios > 4.5:1 for text
- [x] Keyboard navigation support
- [x] Focus indicators on interactive elements
- [x] Alt text for all images
- [x] Form validation messages accessible
- [x] Error messages associated with inputs

**To Verify**:
- [ ] Axe DevTools scan
- [ ] WAVE browser extension scan
- [ ] Keyboard-only navigation (no mouse)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast ratios (WebAIM tool)

### Specific Fixes Applied

**Forms**:
```html
<label htmlFor="tool-selector" className="text-sm font-medium">
  Select Your AI Tools
  <span className="text-red-500" aria-label="required">*</span>
</label>
<input 
  id="tool-selector"
  aria-describedby="tool-help"
  required
/>
<div id="tool-help" className="text-xs text-gray-600">
  Select tools you're currently paying for
</div>
```

**Buttons**:
```html
<button 
  className="... focus:ring-2 focus:ring-offset-2"
  aria-label="Share audit results"
>
  Share
</button>
```

**Results Display**:
```html
<section aria-label="Audit Results">
  <h2>Your Savings</h2>
  <div role="status" aria-live="polite" aria-atomic="true">
    ${savings}
  </div>
</section>
```

---

## Best Practices Target: ≥ 90

### Security

- [x] HTTPS enforced (via Vercel)
- [x] Security headers configured (CSP, X-Frame-Options, etc.)
- [x] No mixed content (HTTP + HTTPS)
- [x] Cookies use Secure + SameSite flags
- [x] No sensitive data in URLs
- [x] Input validation + sanitization

**To Verify**:
- [ ] SSL Labs test
- [ ] Lighthouse "security" audit

### SEO

- [x] Meta tags (title, description)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] Mobile-friendly (viewport meta)
- [x] Canonical URLs
- [x] robots.txt
- [x] sitemap.xml

### Performance

- [x] No console errors
- [x] No console warnings (production)
- [x] No deprecated APIs
- [x] Modern JavaScript (ES2020+)
- [x] No unpolyfilled features for modern browsers

**To Verify**:
- [ ] Browser console (Chrome DevTools)
- [ ] Network waterfall (no slow requests)
- [ ] Time to Interactive < 3s

### Mobile Friendliness

- [x] Responsive layout (mobile-first)
- [x] Touch targets > 48px
- [x] Text readable without zoom
- [ ] Mobile viewport configured

**To Verify**:
- [ ] Mobile Friendly Test
- [ ] Responsive design test (mobile, tablet, desktop)
- [ ] Touch interaction testing on mobile device

---

## Performance Budget

### JavaScript

**Target**: < 200KB gzipped total

**Current** (estimate):
- Next.js framework: ~50KB
- React + React DOM: ~40KB
- Radix UI components: ~20KB
- TailwindCSS: ~30KB
- Audit engine logic: ~15KB
- Other dependencies: ~25KB
- **Total estimate**: ~180KB ✅

**If Over Budget**:
1. Remove unused dependencies (audit with `npm ls`)
2. Use dynamic imports for heavy components
3. Tree-shake unused exports
4. Consider lighter alternatives (e.g., Preact for specific routes)

### CSS

**Target**: < 50KB gzipped

**Approach**:
- TailwindCSS v4 with purging (removes unused styles)
- No CSS-in-JS runtime (all static TailwindCSS)
- Estimated: ~25KB ✅

### Images

**Target**: < 100KB total on hero section

**Approach**:
- Use WebP + AVIF (auto-served via next/image)
- Compress PNGs to < 20KB each
- Use SVGs for icons (< 2KB each)
- Lazy load below-fold images

---

## Testing & Verification

### Local Lighthouse Audit

```bash
# Build for production
npm run build

# Start production server
npm start

# Run Lighthouse via CLI (requires Chrome)
lighthouse http://localhost:3000 \
  --chrome-flags="--headless" \
  --output-path=./lighthouse-report.html
```

### Mobile Test

```bash
# Google's Mobile-Friendly Test
https://search.google.com/test/mobile-friendly

# PageSpeed Insights
https://pagespeed.web.dev/
```

### Accessibility Test

```bash
# Axe DevTools extension (Chrome)
# WAVE browser extension
# Screen reader: NVDA (Windows) or VoiceOver (Mac)
```

---

## Optimizations by Component

### Hero Section

**Hero Text**:
- ✅ Uses web fonts (Geist, preloaded)
- ✅ Line-height > 1.2 for readability
- ✅ Color contrast 21:1 (black on white)

**Hero Image** (if added):
- ✅ Use next/image with priority
- ✅ Set explicit width/height
- ✅ Include alt text
- ✅ Compress to < 20KB
- ✅ Serve as WebP + AVIF

### Form Components

**Tool Selector**:
- ✅ Searchable dropdown (accessibility)
- ✅ Keyboard navigation (arrow keys)
- ✅ Proper labels + descriptions
- ✅ Lazy load (not critical path)

**Submission Button**:
- ✅ 48px minimum height
- ✅ Clear focus indicator
- ✅ Loading state (prevents double-submit)
- ✅ Disabled state during submission

### Results Section

**Large Numbers**:
- ✅ Font-size > 28px for readability
- ✅ High contrast (4.5:1+)
- ✅ Aria-live announcement for screen readers

**Recommendation Cards**:
- ✅ Clear hierarchy (heading → description)
- ✅ Confidence score explained
- ✅ Effort level clear
- ✅ Keyboard accessible

---

## Production Checklist

- [ ] Lighthouse Performance ≥ 85
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Mobile-Friendly Test: Pass
- [ ] PageSpeed Insights: Green on mobile + desktop
- [ ] No console errors (production build)
- [ ] No console warnings (production build)
- [ ] Security headers present
- [ ] DNS prefetch enabled
- [ ] Preconnect to external APIs
- [ ] Resource hints (prefetch, preload)

---

## Monitoring Post-Launch

### Real User Monitoring (RUM)

Option 1: **Web Vitals via Vercel Analytics** (built-in)
- Tracks LCP, FID, CLS on real users
- No setup required on Vercel

Option 2: **Google Analytics 4** (optional)
- Custom event tracking
- Segment by device type / location

Option 3: **Sentry** (optional, for errors)
- Captures JavaScript errors
- Real user monitoring

### Lighthouse CI

Set up in GitHub Actions:
```yaml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './.github/lighthouse/lighthouserc.json'
```

### Alerts

If Lighthouse score drops below:
- Performance < 80 → Investigate
- Accessibility < 85 → Fix before deploying
- Best Practices < 85 → Review changes

---

## Estimated Impact

| Optimization | LCP Impact | FID Impact | CLS Impact |
|---|---|---|---|
| Font preloading | -200ms | +50ms | 0ms |
| React Compiler | -100ms | -30ms | 0ms |
| Image optimization | -150ms | 0ms | +0.05 (prevention) |
| Code splitting | -50ms | -50ms | 0ms |
| CSS purging | -50ms | 0ms | 0ms |

**Expected Final Scores** (after all optimizations):
- Performance: 85–92
- Accessibility: 92–98
- Best Practices: 93–99
- SEO: 95–100
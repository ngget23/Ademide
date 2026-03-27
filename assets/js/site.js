const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const shouldReduceMotion = () => prefersReducedMotionQuery.matches;

const withReveal = (classes, direction = "up", delay = 0) => {
  const delayStyle = delay > 0 ? ` style="--reveal-delay: ${delay}ms"` : "";
  return `class="${classes} reveal-${direction}" data-reveal${delayStyle}`;
};

const buttonMarkup = (action, tone = "primary", motion = {}) => {
  if (!action) return "";
  const revealClassName = motion.direction ? ` reveal-${motion.direction}` : "";
  const revealAttr = motion.direction ? " data-reveal" : "";
  const delayAttr =
    motion.direction && motion.delay > 0 ? ` style="--reveal-delay: ${motion.delay}ms"` : "";
  return `<a class="button button--${tone}${revealClassName}" href="${action.href}"${revealAttr}${delayAttr}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${withReveal("header-inner", "up", 70)}>
    <a class="brand" href="index.html" aria-label="Ademide home">
      <span class="brand-mark">${data.brand.mark}</span>
      <span class="brand-copy">
        <strong>${data.brand.name}</strong>
        <small>${data.brand.role}</small>
      </span>
    </a>
    <nav class="site-nav" aria-label="Primary navigation">
      ${data.navigation
        .map(
          (item) =>
            `<a class="nav-link ${item.id === pageId ? "is-active" : ""}" href="${item.href}" ${
              item.id === pageId ? 'aria-current="page"' : ""
            }>${item.label}</a>`
        )
        .join("")}
    </nav>
    <a class="mini-cta" href="contact.html">Book Build</a>
  </div>
`;

const renderHero = (hero) => `
  <section class="hero">
    <div ${withReveal("hero-copy", "left", 100)}>
      <div class="hero-topline">
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1>${hero.title}</h1>
      <p>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 320 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 400 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${withReveal("stat-card glass-card", "up", 420 + index * 90)}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${withReveal("hero-side-card glass-card", "right", 180)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${withReveal("hero-visual", "right", 260)}>
        <div class="halo halo--one"></div>
        <div class="halo halo--two"></div>
        <div class="halo halo--three"></div>
        <div class="visual-noise"></div>
        <div class="capsule-shell">
          <div class="capsule-shell-inner">
            <div class="capsule-top"></div>
            <div class="capsule-screens">
              <div class="capsule-screen"></div>
              <div class="capsule-screen capsule-screen--tall"></div>
            </div>
          </div>
        </div>
        ${pillsMarkup(hero.visualLabels || data.defaultVisualLabels)}
      </div>
    </div>
  </section>
`;

const renderMarquee = () => {
  const items = [...data.marquee, ...data.marquee]
    .map((item) => `<span class="marquee-pill">${item}</span>`)
    .join("");
  return `
    <section class="marquee-band" aria-label="Technology marquee">
      <div class="marquee-track">${items}</div>
    </section>
  `;
};

const renderSectionHeading = (section) => `
  <div ${withReveal("section-heading", "left", 90)}>
    <span class="section-kicker">${section.kicker}</span>
    ${section.title ? `<h2>${section.title}</h2>` : ""}
    ${section.copy ? `<p>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("info-card glass-card", "up", 140 + index * 90)}>
              <span class="card-eyebrow">${item.eyebrow}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              ${item.meta ? `<span class="card-meta">${item.meta}</span>` : ""}
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderProjectsSection = (section) => `
  <section class="content-section section-projects-shell">
    ${renderSectionHeading(section)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("project-card glass-card", "up", 140 + index * 90)}>
              <div class="project-topline">
                <span class="project-index">Case</span>
                <span class="project-outcome">${item.outcome}</span>
              </div>
              <h3>${item.title}</h3>
              <p>${item.summary}</p>
              <div class="tag-row">
                ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderMetricsSection = (section) => `
  <section class="content-section metrics-shell">
    ${renderSectionHeading(section)}
    <div class="metric-grid">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("metric-card glass-card", "up", 130 + index * 80)}>
              <strong>${item.value}</strong>
              <span>${item.label}</span>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderTimelineSection = (section) => `
  <section class="content-section timeline-shell">
    ${renderSectionHeading(section)}
    <div class="timeline-grid">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("timeline-card glass-card", "up", 140 + index * 90)}>
              <span class="timeline-phase">${item.phase}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderOrbitSection = (section) => `
  <section class="content-section orbit-shell">
    ${renderSectionHeading(section)}
    <div class="orbit-stage">
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      ${section.items
        .map((item, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          return `<article ${withReveal(
            `orbit-node orbit-node--${index + 1} glass-card`,
            direction,
            120 + index * 90
          )}><h3>${item.title}</h3><p>${item.text}</p></article>`;
        })
        .join("")}
      <div class="orbit-core glass-card">
        <div ${withReveal("orbit-core-content", "up", 220)}>
          <span class="card-eyebrow">${section.center.eyebrow}</span>
          <h3>${section.center.title}</h3>
          <p>${section.center.text}</p>
        </div>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article ${withReveal("quote-card glass-card", "up", 120)}>
      <span class="section-kicker">${section.kicker}</span>
      <blockquote>${section.quote}</blockquote>
      <div class="quote-meta">
        <strong>${section.source}</strong>
        <span>${section.aside}</span>
      </div>
    </article>
  </section>
`;

const renderCtaSection = (section) => `
  <section class="content-section cta-shell">
    <article ${withReveal("cta-card glass-card", "up", 120)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 280 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 360 })}
      </div>
    </article>
  </section>
`;

const renderSection = (section) => {
  switch (section.type) {
    case "grid":
      return renderGridSection(section);
    case "projects":
      return renderProjectsSection(section);
    case "metrics":
      return renderMetricsSection(section);
    case "timeline":
      return renderTimelineSection(section);
    case "orbit":
      return renderOrbitSection(section);
    case "quote":
      return renderQuoteSection(section);
    case "cta":
      return renderCtaSection(section);
    default:
      return "";
  }
};

const renderFooter = () => `
  <div class="footer-inner glass-card">
    <div class="reveal-up" data-reveal style="--reveal-delay: 70ms">
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div class="footer-links reveal-up" data-reveal style="--reveal-delay: 160ms">
      ${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
    </div>
    <div class="footer-meta reveal-up" data-reveal style="--reveal-delay: 240ms">
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealElements.length) return;

  const makeVisible = () => {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  };

  if (!("IntersectionObserver" in window) || shouldReduceMotion()) {
    makeVisible();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px 12% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));

  const reduceMotionListener = (event) => {
    if (!event.matches) return;
    makeVisible();
    observer.disconnect();
    if (typeof prefersReducedMotionQuery.removeEventListener === "function") {
      prefersReducedMotionQuery.removeEventListener("change", reduceMotionListener);
    } else if (typeof prefersReducedMotionQuery.removeListener === "function") {
      prefersReducedMotionQuery.removeListener(reduceMotionListener);
    }
  };

  if (typeof prefersReducedMotionQuery.addEventListener === "function") {
    prefersReducedMotionQuery.addEventListener("change", reduceMotionListener);
  } else if (typeof prefersReducedMotionQuery.addListener === "function") {
    prefersReducedMotionQuery.addListener(reduceMotionListener);
  }
};

const initHeroMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || shouldReduceMotion()) return;

  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerCurrentX = 0;
  let pointerCurrentY = 0;
  let pointerFrame = 0;
  let scrollFrame = 0;

  const updatePointer = () => {
    pointerCurrentX += (pointerTargetX - pointerCurrentX) * 0.16;
    pointerCurrentY += (pointerTargetY - pointerCurrentY) * 0.16;
    visual.style.setProperty("--move-x", `${pointerCurrentX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${pointerCurrentY.toFixed(2)}px`);

    const done =
      Math.abs(pointerCurrentX - pointerTargetX) < 0.08 &&
      Math.abs(pointerCurrentY - pointerTargetY) < 0.08;
    if (done) {
      pointerFrame = 0;
      return;
    }
    pointerFrame = window.requestAnimationFrame(updatePointer);
  };

  const queuePointerUpdate = () => {
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(updatePointer);
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    pointerTargetX = offsetX;
    pointerTargetY = offsetY;
    queuePointerUpdate();
  });

  visual.addEventListener("pointerleave", () => {
    pointerTargetX = 0;
    pointerTargetY = 0;
    queuePointerUpdate();
  });

  const updateParallax = () => {
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const visualCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const progress = clamp((viewportCenter - visualCenter) / viewportHeight, -1, 1);

    const shiftY = progress * 16;
    const shiftX = progress * 5;
    const softShiftY = progress * 8;
    const softShiftX = progress * 3;
    const tilt = progress * 1.4;

    visual.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-y-soft", `${softShiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-x-soft", `${softShiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${tilt.toFixed(2)}deg`);
    scrollFrame = 0;
  };

  const queueParallaxUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateParallax);
  };

  window.addEventListener("scroll", queueParallaxUpdate, { passive: true });
  window.addEventListener("resize", queueParallaxUpdate);
  queueParallaxUpdate();
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initHeroMotion();

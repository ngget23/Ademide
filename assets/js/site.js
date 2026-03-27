const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clampDelay = (value = 0) => Math.max(0, Math.round(Number(value) || 0));
const staggerDelay = (index, base = 0, step = 90, max = 640) =>
  Math.min(clampDelay(base + index * step), max);

const revealProps = (baseClasses = "", direction, delay = 0) => {
  const safeBaseClasses = baseClasses.trim();
  if (!direction) return safeBaseClasses ? `class="${safeBaseClasses}"` : "";

  const classNames = [safeBaseClasses, `reveal-${direction}`].filter(Boolean).join(" ");
  const safeDelay = clampDelay(delay);
  const delayStyle = safeDelay > 0 ? ` style="--reveal-delay: ${safeDelay}ms;"` : "";
  return `class="${classNames}" data-reveal${delayStyle}`;
};

const buttonMarkup = (action, tone = "primary", motion = {}) => {
  if (!action) return "";

  const button = `<a class="button button--${tone}" href="${action.href}">${action.label}</a>`;
  if (!motion.direction) return button;

  return `<span ${revealProps("button-reveal", motion.direction, motion.delay)}>${button}</span>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${revealProps("header-inner", "up", 40)}>
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
    <div class="hero-copy">
      <div class="hero-topline">
        <span ${revealProps("eyebrow", "left", 80)}>${hero.eyebrow}</span>
        <span ${revealProps("handle", "left", 140)}>${hero.handle}</span>
      </div>
      <h1 ${revealProps("", "left", 210)}>${hero.title}</h1>
      <p ${revealProps("", "left", 290)}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 360 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 430 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${revealProps("stat-card glass-card", "up", staggerDelay(index, 430, 110, 760))}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${revealProps("hero-side-card glass-card", "right", 250)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${revealProps("hero-visual", "right", 320)}>
        <div class="hero-parallax-layer">
          <div class="halo halo--one"></div>
          <div class="halo halo--two"></div>
          <div class="halo halo--three"></div>
          <div class="visual-noise"></div>
          <div class="capsule-shell-motion">
            <div class="capsule-shell">
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
  <div class="section-heading">
    <span ${revealProps("section-kicker", "left", 70)}>${section.kicker}</span>
    ${section.title ? `<h2 ${revealProps("", "left", 150)}>${section.title}</h2>` : ""}
    ${section.copy ? `<p ${revealProps("", "left", 230)}>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article ${revealProps("info-card glass-card", "up", staggerDelay(index, 120, 90, 560))}>
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
            <article ${revealProps("project-card glass-card", "up", staggerDelay(index, 120, 90, 560))}>
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
            <article ${revealProps("metric-card glass-card", "up", staggerDelay(index, 100, 80, 520))}>
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
            <article ${revealProps("timeline-card glass-card", "up", staggerDelay(index, 120, 90, 560))}>
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
    <div ${revealProps("orbit-stage", "up", 120)}>
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      <article ${revealProps("orbit-node orbit-node--1 glass-card", "left", 200)}><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article ${revealProps("orbit-node orbit-node--2 glass-card", "right", 260)}><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article ${revealProps("orbit-node orbit-node--3 glass-card", "left", 320)}><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article ${revealProps("orbit-node orbit-node--4 glass-card", "right", 380)}><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
      <div class="orbit-core glass-card">
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article ${revealProps("quote-card glass-card", "up", 120)}>
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
    <article ${revealProps("cta-card glass-card", "up", 120)}>
      <span ${revealProps("section-kicker", "left", 190)}>${section.kicker}</span>
      <h2 ${revealProps("", "up", 250)}>${section.title}</h2>
      <p ${revealProps("", "up", 320)}>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 390 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 460 })}
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
    <div ${revealProps("", "left", 90)}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div ${revealProps("footer-links", "up", 170)}>
      ${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
    </div>
    <div ${revealProps("footer-meta", "right", 250)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealElements = [...document.querySelectorAll("[data-reveal]")];
  if (!revealElements.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = 0;

  const animatePointer = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    visual.style.setProperty("--pointer-x", `${currentX.toFixed(2)}px`);
    visual.style.setProperty("--pointer-y", `${currentY.toFixed(2)}px`);

    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      rafId = window.requestAnimationFrame(animatePointer);
    } else {
      rafId = 0;
    }
  };

  const queuePointerFrame = () => {
    if (!rafId) rafId = window.requestAnimationFrame(animatePointer);
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    targetX = normalizedX * 14;
    targetY = normalizedY * 12;
    queuePointerFrame();
  });

  const resetPointerMotion = () => {
    targetX = 0;
    targetY = 0;
    queuePointerFrame();
  };

  visual.addEventListener("pointerleave", resetPointerMotion);
  visual.addEventListener("pointercancel", resetPointerMotion);
};

const initHeroParallax = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion) return;

  let targetShiftX = 0;
  let targetShiftY = 0;
  let targetTilt = 0;
  let currentShiftX = 0;
  let currentShiftY = 0;
  let currentTilt = 0;
  let rafId = 0;

  const animateParallax = () => {
    currentShiftX += (targetShiftX - currentShiftX) * 0.12;
    currentShiftY += (targetShiftY - currentShiftY) * 0.12;
    currentTilt += (targetTilt - currentTilt) * 0.1;

    visual.style.setProperty("--scroll-shift-x", `${currentShiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-y", `${currentShiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${currentTilt.toFixed(2)}deg`);

    if (
      Math.abs(targetShiftX - currentShiftX) > 0.05 ||
      Math.abs(targetShiftY - currentShiftY) > 0.05 ||
      Math.abs(targetTilt - currentTilt) > 0.03
    ) {
      rafId = window.requestAnimationFrame(animateParallax);
    } else {
      rafId = 0;
    }
  };

  const queueParallaxFrame = () => {
    if (!rafId) rafId = window.requestAnimationFrame(animateParallax);
  };

  const updateParallaxTargets = () => {
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = (viewportHeight * 0.52 - rect.top) / viewportHeight;
    const boundedProgress = Math.max(-1, Math.min(1, progress));

    targetShiftY = boundedProgress * -20;
    targetShiftX = boundedProgress * 5;
    targetTilt = boundedProgress * 1.8;
    queueParallaxFrame();
  };

  window.addEventListener("scroll", updateParallaxTargets, { passive: true });
  window.addEventListener("resize", updateParallaxTargets);
  updateParallaxTargets();
};

if (headerHost) headerHost.innerHTML = renderHeader();
if (app) app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
if (footerHost) footerHost.innerHTML = renderFooter();
const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();
revealOnScroll();
initPointerMotion();
initHeroParallax();

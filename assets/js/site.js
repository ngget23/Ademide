const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const staggerDelay = (index, base = 120, step = 90, cap = 780) => Math.min(base + index * step, cap);

const revealClass = (direction = "up") => `reveal-${direction}`;

const revealStyle = (delay = 0, baseTransform = "") => {
  const styles = [];
  if (delay) styles.push(`--reveal-delay: ${delay}ms`);
  if (baseTransform) styles.push(`--reveal-base-transform: ${baseTransform}`);
  return styles.length ? ` style="${styles.join("; ")};"` : "";
};

const revealAttr = (baseClass, direction = "up", delay = 0, baseTransform = "") =>
  `class="${baseClass} ${revealClass(direction)}"${revealStyle(delay, baseTransform)}`;

const buttonMarkup = (action, tone = "primary", motion = {}) => {
  if (!action) return "";
  const revealToken = motion.direction ? ` ${revealClass(motion.direction)}` : "";
  const delayStyle = motion.delay ? ` style="--reveal-delay: ${motion.delay}ms;"` : "";
  return `<a class="button button--${tone}${revealToken}" href="${action.href}"${delayStyle}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${revealAttr("header-inner", "up", 90)}>
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
      <div ${revealAttr("hero-topline", "left", 100)}>
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1 class="${revealClass("left")}"${revealStyle(180)}>${hero.title}</h1>
      <p class="${revealClass("left")}"${revealStyle(260)}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 340 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 420 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${revealAttr("stat-card glass-card", "up", staggerDelay(index, 500, 90, 860))}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${revealAttr("hero-side-card glass-card", "right", 220)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${revealAttr("hero-visual", "right", 300)}>
        <div class="halo halo--one"></div>
        <div class="halo halo--two"></div>
        <div class="halo halo--three"></div>
        <div class="visual-noise"></div>
        <div class="capsule-drift">
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
  <div ${revealAttr("section-heading", "left", 90)}>
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
            <article ${revealAttr("info-card glass-card", "up", staggerDelay(index, 140, 80, 700))}>
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
            <article ${revealAttr("project-card glass-card", "up", staggerDelay(index, 160, 90, 720))}>
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
            <article ${revealAttr("metric-card glass-card", "up", staggerDelay(index, 150, 80, 620))}>
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
            <article ${revealAttr("timeline-card glass-card", "up", staggerDelay(index, 150, 90, 710))}>
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

const renderOrbitSection = (section) => {
  const nodes = section.items
    .slice(0, 4)
    .map(
      (item, index) => `
        <article ${revealAttr(
          `orbit-node orbit-node--${index + 1} glass-card`,
          index % 2 === 0 ? "left" : "right",
          staggerDelay(index, 140, 90, 500)
        )}>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="content-section orbit-shell">
      ${renderSectionHeading(section)}
      <div class="orbit-stage">
        <div class="orbit-path orbit-path--one"></div>
        <div class="orbit-path orbit-path--two"></div>
        <div class="orbit-path orbit-path--three"></div>
        ${nodes}
        <div ${revealAttr("orbit-core glass-card", "up", 290)}>
          <span class="card-eyebrow">${section.center.eyebrow}</span>
          <h3>${section.center.title}</h3>
          <p>${section.center.text}</p>
        </div>
      </div>
    </section>
  `;
};

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article ${revealAttr("quote-card glass-card", "up", 130)}>
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
    <article ${revealAttr("cta-card glass-card", "up", 140)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 240 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 320 })}
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
    <div ${revealAttr("footer-lead", "up", 90)}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div ${revealAttr("footer-links", "up", 170)}>
      ${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
    </div>
    <div ${revealAttr("footer-meta", "up", 250)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const initScrollReveals = () => {
  const revealTargets = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
  if (!revealTargets.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
};

const initHeroParallax = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion()) return;

  let rafId = 0;

  const update = () => {
    rafId = 0;
    const rect = visual.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const offsetFromCenter = rect.top + rect.height * 0.5 - viewport * 0.5;
    const progress = clamp(offsetFromCenter / viewport, -1, 1);
    const scrollShiftY = (-progress * 16).toFixed(2);
    const chipShiftY = (progress * 8).toFixed(2);
    const scrollTilt = (-progress * 2.2).toFixed(2);

    visual.style.setProperty("--scroll-shift-y", `${scrollShiftY}px`);
    visual.style.setProperty("--scroll-chip-shift", `${chipShiftY}px`);
    visual.style.setProperty("--scroll-tilt", `${scrollTilt}deg`);
  };

  const requestUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(update);
  };

  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion()) return;

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    visual.style.setProperty("--move-x", `${offsetX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${offsetY.toFixed(2)}px`);
  });

  visual.addEventListener("pointerleave", () => {
    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
  });
};

if (headerHost) headerHost.innerHTML = renderHeader();
if (app) app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
if (footerHost) footerHost.innerHTML = renderFooter();

const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

initScrollReveals();
initHeroParallax();
initPointerMotion();

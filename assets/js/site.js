const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealVars = (delay = 0, duration = 0.95) =>
  `style="--reveal-delay: ${delay}ms; --reveal-duration: ${duration}s;"`;

const staggerDelay = (index, base = 120, step = 85, max = 560) =>
  Math.min(base + index * step, max);

const cycleDirection = (index) => ["left", "right", "up"][index % 3];

const buttonMarkup = (action, tone = "primary", motion = null) => {
  if (!action) return "";
  const revealClass = motion ? ` reveal-${motion.direction || "up"}` : "";
  const revealAttrs = motion
    ? ` data-reveal ${revealVars(motion.delay ?? 0, motion.duration ?? 0.95)}`
    : "";
  return `<a class="button button--${tone}${revealClass}" href="${action.href}"${revealAttrs}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div class="header-inner reveal-up" data-reveal ${revealVars(40, 0.9)}>
    <a class="brand reveal-left" href="index.html" aria-label="Ademide home" data-reveal ${revealVars(90, 0.95)}>
      <span class="brand-mark">${data.brand.mark}</span>
      <span class="brand-copy">
        <strong>${data.brand.name}</strong>
        <small>${data.brand.role}</small>
      </span>
    </a>
    <nav class="site-nav reveal-up" aria-label="Primary navigation" data-reveal ${revealVars(140, 0.9)}>
      ${data.navigation
        .map(
          (item, index) =>
            `<a class="nav-link reveal-up ${item.id === pageId ? "is-active" : ""}" href="${item.href}" ${
              item.id === pageId ? 'aria-current="page"' : ""
            } data-reveal ${revealVars(staggerDelay(index, 160, 40, 320), 0.85)}>${item.label}</a>`
        )
        .join("")}
    </nav>
    <a class="mini-cta reveal-right" href="contact.html" data-reveal ${revealVars(210, 0.95)}>Book Build</a>
  </div>
`;

const renderHero = (hero) => `
  <section class="hero">
    <div class="hero-copy reveal-left" data-reveal ${revealVars(100, 1.05)}>
      <div class="hero-topline reveal-up" data-reveal ${revealVars(130, 0.9)}>
        <span class="eyebrow reveal-up" data-reveal ${revealVars(150, 0.85)}>${hero.eyebrow}</span>
        <span class="handle reveal-up" data-reveal ${revealVars(190, 0.85)}>${hero.handle}</span>
      </div>
      <h1 class="reveal-left" data-reveal ${revealVars(180, 1.1)}>${hero.title}</h1>
      <p class="reveal-up" data-reveal ${revealVars(250, 0.95)}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 320, duration: 0.9 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 380, duration: 0.9 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article class="stat-card glass-card reveal-up" data-reveal ${revealVars(staggerDelay(index, 380, 90, 620), 0.95)}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article class="hero-side-card glass-card reveal-right" data-reveal ${revealVars(220, 1)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div class="hero-visual reveal-right" data-reveal ${revealVars(280, 1.05)}>
        <div class="halo halo--one"></div>
        <div class="halo halo--two"></div>
        <div class="halo halo--three"></div>
        <div class="visual-noise"></div>
        <div class="capsule-shell">
          <div class="capsule-top"></div>
          <div class="capsule-screens">
            <div class="capsule-screen"></div>
            <div class="capsule-screen capsule-screen--tall"></div>
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
  <div class="section-heading">
    <span class="section-kicker reveal-left" data-reveal ${revealVars(100, 0.9)}>${section.kicker}</span>
    ${section.title ? `<h2 class="reveal-left" data-reveal ${revealVars(150, 1)}>${section.title}</h2>` : ""}
    ${section.copy ? `<p class="reveal-up" data-reveal ${revealVars(220, 0.95)}>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article class="info-card glass-card reveal-${cycleDirection(index)}" data-reveal ${revealVars(staggerDelay(index), 0.95)}>
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
            <article class="project-card glass-card reveal-${cycleDirection(index + 1)}" data-reveal ${revealVars(staggerDelay(index, 130, 90), 1)}>
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
            <article class="metric-card glass-card reveal-up" data-reveal ${revealVars(staggerDelay(index, 110, 80), 0.95)}>
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
            <article class="timeline-card glass-card reveal-up" data-reveal ${revealVars(staggerDelay(index, 130, 90), 1)}>
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
        .map(
          (item, index) => `
            <article class="orbit-node orbit-node--${index + 1} glass-card reveal-${index % 2 === 0 ? "left" : "right"}" data-reveal ${revealVars(staggerDelay(index, 140, 90), 1)}>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `
        )
        .join("")}
      <div class="orbit-core glass-card reveal-up" data-reveal ${revealVars(240, 1.05)}>
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article class="quote-card glass-card reveal-up" data-reveal ${revealVars(140, 1.05)}>
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
    <article class="cta-card glass-card reveal-up" data-reveal ${revealVars(140, 1)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 210, duration: 0.9 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 280, duration: 0.9 })}
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
    <div class="reveal-left" data-reveal ${revealVars(80, 1)}>
      <span class="section-kicker reveal-up" data-reveal ${revealVars(120, 0.9)}>${data.brand.role}</span>
      <h2 class="reveal-left" data-reveal ${revealVars(160, 1)}>${data.brand.name}</h2>
      <p class="reveal-up" data-reveal ${revealVars(220, 0.95)}>${data.brand.blurb}</p>
    </div>
    <div class="footer-links">
      ${data.navigation
        .map(
          (item, index) =>
            `<a class="reveal-up" href="${item.href}" data-reveal ${revealVars(staggerDelay(index, 120, 55, 420), 0.9)}>${item.label}</a>`
        )
        .join("")}
    </div>
    <div class="footer-meta reveal-right" data-reveal ${revealVars(180, 0.95)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!revealElements.length) return;

  if (reduceMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
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
      threshold: 0.14,
      rootMargin: "0px 0px -12% 0px",
    }
  );
  revealElements.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || reduceMotionQuery.matches) return;

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    visual.style.setProperty("--move-x", `${offsetX}px`);
    visual.style.setProperty("--move-y", `${offsetY}px`);
  });
  visual.addEventListener("pointerleave", () => {
    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
  });
};

const initHeroParallax = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || reduceMotionQuery.matches) return;

  let rafId = null;

  const updateParallax = () => {
    rafId = null;
    const rect = visual.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const visualCenter = rect.top + rect.height / 2;
    const progress = Math.max(-1, Math.min(1, (visualCenter - viewportCenter) / window.innerHeight));

    visual.style.setProperty("--scroll-shift-y", `${(-progress * 18).toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-x", `${(progress * 8).toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${(progress * 1.3).toFixed(2)}deg`);
  };

  const requestParallax = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initPointerMotion();
initHeroParallax();

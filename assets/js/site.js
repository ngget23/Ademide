const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');

const staggerDelay = (index, start = 0, step = 90) => start + index * step;
const revealDuration = (order = 0) => 860 + (order % 5) * 80;
const revealStyle = (delay = 0, order = 0) =>
  `style="--reveal-duration: ${revealDuration(order)}ms; --reveal-delay: ${delay}ms;"`;
const revealAttrs = (baseClass, direction = "up", delay = 0, order = 0) =>
  `class="${baseClass} reveal-${direction}" data-reveal ${revealStyle(delay, order)}`;
const revealClassOnly = (baseClass, direction = "up", delay = 0, order = 0) =>
  `class="${baseClass} reveal-${direction}" ${revealStyle(delay, order)}`;

const buttonMarkup = (action, tone = "primary") => {
  if (!action) return "";
  return `<a class="button button--${tone}" href="${action.href}">${action.label}</a>`;
};

const actionButtonMarkup = (action, tone, direction, delay, order) => {
  if (!action) return "";
  return `<span ${revealAttrs("action-reveal", direction, delay, order)}>${buttonMarkup(action, tone)}</span>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${revealClassOnly("header-inner", "up", 40, 0)}>
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
    <div ${revealAttrs("hero-copy", "left", 80, 1)}>
      <div class="hero-topline">
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1>${hero.title}</h1>
      <p>${hero.lead}</p>
      <div class="hero-actions">
        ${actionButtonMarkup(hero.primaryAction, "primary", "up", 250, 4)}
        ${actionButtonMarkup(hero.secondaryAction, "secondary", "up", 320, 5)}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${revealAttrs("stat-card glass-card", "up", staggerDelay(index, 220, 90), index + 2)}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${revealAttrs("hero-side-card glass-card", "right", 170, 2)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${revealAttrs("hero-visual", "right", 260, 3)}>
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
    <section ${revealAttrs("marquee-band", "up", 140, 2)} aria-label="Technology marquee">
      <div class="marquee-track">${items}</div>
    </section>
  `;
};

const renderSectionHeading = (section) => `
  <div ${revealAttrs("section-heading", "left", 40, 1)}>
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
            <article ${revealAttrs("info-card glass-card", "up", staggerDelay(index, 130, 80), index + 3)}>
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
            <article ${revealAttrs(
              "project-card glass-card",
              index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right",
              staggerDelay(index, 120, 80),
              index + 3
            )}>
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
            <article ${revealAttrs("metric-card glass-card", "up", staggerDelay(index, 120, 70), index + 2)}>
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
            <article ${revealAttrs("timeline-card glass-card", "up", staggerDelay(index, 130, 80), index + 2)}>
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
      <article ${revealAttrs("orbit-node orbit-node--1 glass-card", "left", 120, 2)}><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article ${revealAttrs("orbit-node orbit-node--2 glass-card", "right", 180, 3)}><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article ${revealAttrs("orbit-node orbit-node--3 glass-card", "left", 240, 4)}><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article ${revealAttrs("orbit-node orbit-node--4 glass-card", "right", 300, 5)}><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
      <div class="orbit-core glass-card">
        <div ${revealAttrs("orbit-core-content", "up", 180, 3)}>
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
    <article ${revealAttrs("quote-card glass-card", "up", 110, 2)}>
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
    <article ${revealAttrs("cta-card glass-card", "up", 120, 2)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${actionButtonMarkup(section.primaryAction, "primary", "up", 260, 4)}
        ${actionButtonMarkup(section.secondaryAction, "secondary", "up", 330, 5)}
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
  <div ${revealAttrs("footer-inner glass-card", "up", 110, 2)}>
    <div>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div class="footer-links">
      ${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
    </div>
    <div class="footer-meta">
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const initHeaderEntrance = () => {
  const header = document.querySelector(".header-inner.reveal-up");
  if (!header) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    header.classList.add("is-visible");
    return;
  }
  window.requestAnimationFrame(() => {
    header.classList.add("is-visible");
  });
};

const revealOnScroll = () => {
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px 10% 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
};

const initHeroMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
    visual.style.setProperty("--scroll-shift-x", "0px");
    visual.style.setProperty("--scroll-shift-y", "0px");
    visual.style.setProperty("--halo-shift-x", "0px");
    visual.style.setProperty("--halo-shift-y", "0px");
    visual.style.setProperty("--noise-shift-x", "0px");
    visual.style.setProperty("--noise-shift-y", "0px");
    return;
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let rafId = null;

  const syncScrollParallax = () => {
    rafId = null;
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
    const shiftY = clamp(centerOffset * -12, -10, 10);
    const shiftX = clamp(centerOffset * 5, -5, 5);
    visual.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
    visual.style.setProperty("--halo-shift-x", `${(shiftX * 0.45).toFixed(2)}px`);
    visual.style.setProperty("--halo-shift-y", `${(shiftY * 0.35).toFixed(2)}px`);
    visual.style.setProperty("--noise-shift-x", `${(shiftX * 0.3).toFixed(2)}px`);
    visual.style.setProperty("--noise-shift-y", `${(shiftY * 0.5).toFixed(2)}px`);
  };

  const requestParallaxFrame = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(syncScrollParallax);
  };

  window.addEventListener("scroll", requestParallaxFrame, { passive: true });
  window.addEventListener("resize", requestParallaxFrame);

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    visual.style.setProperty("--move-x", `${offsetX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${offsetY.toFixed(2)}px`);
  });
  visual.addEventListener("pointerleave", () => {
    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
  });

  requestParallaxFrame();
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
initHeaderEntrance();
revealOnScroll();
initHeroMotion();

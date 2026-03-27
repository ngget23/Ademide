const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const formatDelay = (delay = 0) => `${Math.max(0, Number(delay) || 0).toFixed(2)}s`;

const withReveal = (baseClass = "", direction = "up", delay = 0) => {
  const className = [baseClass, `reveal-${direction}`].filter(Boolean).join(" ");
  return `class="${className}" data-reveal style="--reveal-delay: ${formatDelay(delay)};"`;
};

const buttonMarkup = (action, tone = "primary", delay = 0, direction = "up") => {
  if (!action) return "";
  return `<a ${withReveal(`button button--${tone}`, direction, delay)} href="${action.href}">${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${withReveal("header-inner", "up", 0.04)}>
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
    <div ${withReveal("hero-copy", "left", 0.08)}>
      <div class="hero-topline">
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1>${hero.title}</h1>
      <p>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", 0.28, "up")}
        ${buttonMarkup(hero.secondaryAction, "secondary", 0.34, "up")}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${withReveal("stat-card glass-card", "up", 0.42 + index * 0.08)}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${withReveal("hero-side-card glass-card", "right", 0.16)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${withReveal("hero-visual", "right", 0.24)}>
        <div class="halo halo--one"></div>
        <div class="halo halo--two"></div>
        <div class="halo halo--three"></div>
        <div class="visual-noise"></div>
        <div class="capsule-float">
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

const renderSectionHeading = (section, direction = "left", delay = 0.06) => `
  <div ${withReveal("section-heading", direction, delay)}>
    <span class="section-kicker">${section.kicker}</span>
    ${section.title ? `<h2>${section.title}</h2>` : ""}
    ${section.copy ? `<p>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section, "left", 0.05)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("info-card glass-card", "up", 0.14 + index * 0.08)}>
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
    ${renderSectionHeading(section, "left", 0.05)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("project-card glass-card", "up", 0.14 + index * 0.08)}>
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
    ${renderSectionHeading(section, "left", 0.05)}
    <div class="metric-grid">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("metric-card glass-card", "up", 0.14 + index * 0.08)}>
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
    ${renderSectionHeading(section, "left", 0.05)}
    <div class="timeline-grid">
      ${section.items
        .map(
          (item, index) => `
            <article ${withReveal("timeline-card glass-card", index % 2 === 0 ? "left" : "right", 0.14 + index * 0.08)}>
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
    ${renderSectionHeading(section, "left", 0.05)}
    <div class="orbit-stage">
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      <article ${withReveal("orbit-node orbit-node--1 glass-card", "left", 0.14)}><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article ${withReveal("orbit-node orbit-node--2 glass-card", "right", 0.22)}><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article ${withReveal("orbit-node orbit-node--3 glass-card", "left", 0.3)}><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article ${withReveal("orbit-node orbit-node--4 glass-card", "right", 0.38)}><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
      <div ${withReveal("orbit-core glass-card", "up", 0.18)}>
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article ${withReveal("quote-card glass-card", "up", 0.1)}>
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
    <article ${withReveal("cta-card glass-card", "up", 0.1)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", 0.2, "up")}
        ${buttonMarkup(section.secondaryAction, "secondary", 0.28, "up")}
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
    <div ${withReveal("", "left", 0.06)}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div ${withReveal("footer-links", "up", 0.14)}>
      ${data.navigation
        .map(
          (item, index) =>
            `<a ${withReveal("", "up", 0.18 + index * 0.03)} href="${item.href}">${item.label}</a>`
        )
        .join("")}
    </div>
    <div ${withReveal("footer-meta", "right", 0.22)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const targets = [...document.querySelectorAll("[data-reveal]")];
  if (!targets.length) return;
  if (prefersReducedMotion.matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
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
      rootMargin: "0px 0px -8% 0px",
    }
  );
  targets.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion.matches) return;
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
  if (!visual || prefersReducedMotion.matches) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
    const ratio = Math.max(-1, Math.min(1, distanceFromCenter / viewportHeight));

    visual.style.setProperty("--scroll-shell-x", `${ratio * -4}px`);
    visual.style.setProperty("--scroll-shell-y", `${ratio * -14}px`);
    visual.style.setProperty("--scroll-halo-x", `${ratio * 3}px`);
    visual.style.setProperty("--scroll-halo-y", `${ratio * -9}px`);
    visual.style.setProperty("--scroll-noise-x", `${ratio * -2}px`);
    visual.style.setProperty("--scroll-noise-y", `${ratio * -5}px`);
  };

  const requestTick = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  requestTick();
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initPointerMotion();
initHeroParallax();

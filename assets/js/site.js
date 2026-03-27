const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');

const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const DEFAULT_REVEAL_DURATION = 0.95;
const STAGGER_STEP = 90;
const CARD_REVEAL_PATTERN = ["left", "up", "right", "up"];
const ALT_CARD_REVEAL_PATTERN = ["right", "up", "left", "up"];

const getRevealDirection = (index, pattern = CARD_REVEAL_PATTERN) => pattern[index % pattern.length];

const buildRevealStyle = (delay = 0, duration = DEFAULT_REVEAL_DURATION) =>
  `--reveal-delay:${delay}ms; --reveal-duration:${duration}s;`;

const withReveal = ({
  classes = "",
  direction = "up",
  delay = 0,
  duration = DEFAULT_REVEAL_DURATION,
} = {}) => {
  const className = `${classes ? `${classes} ` : ""}reveal-${direction}`.trim();
  return `class="${className}" data-reveal style="${buildRevealStyle(delay, duration)}"`;
};

const buttonMarkup = (action, tone = "primary", revealOptions = null) => {
  if (!action) return "";
  const direction = revealOptions?.direction || "up";
  const delay = revealOptions?.delay ?? 0;
  const duration = revealOptions?.duration ?? DEFAULT_REVEAL_DURATION;
  const revealClass = revealOptions ? ` reveal-${direction}` : "";
  const revealData = revealOptions ? " data-reveal" : "";
  const revealStyle = revealOptions ? ` style="${buildRevealStyle(delay, duration)}"` : "";
  return `<a class="button button--${tone}${revealClass}" href="${action.href}"${revealData}${revealStyle}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map(
      (item, index) =>
        `<span class="code-chip code-chip--${index + 1}"><span class="code-chip__inner">${item}</span></span>`
    )
    .join("");

const renderHeader = () => `
  <div ${withReveal({ classes: "header-inner", direction: "up", delay: 40, duration: 1.05 })}>
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
      <div ${withReveal({ classes: "hero-topline", direction: "left", delay: 90, duration: 0.95 })}>
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1 ${withReveal({ direction: "left", delay: 160, duration: 1.1 })}>${hero.title}</h1>
      <p ${withReveal({ direction: "left", delay: 240, duration: 1.02 })}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 320, duration: 0.92 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 390, duration: 0.92 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${withReveal({
                classes: "stat-card glass-card",
                direction: "up",
                delay: 360 + index * STAGGER_STEP,
                duration: 0.9,
              })}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${withReveal({
        classes: "hero-side-card glass-card",
        direction: "right",
        delay: 280,
        duration: 1.02,
      })}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${withReveal({ classes: "hero-visual-wrap", direction: "right", delay: 360, duration: 1.12 })}>
        <div class="hero-visual">
          <div class="halo halo--one"></div>
          <div class="halo halo--two"></div>
          <div class="halo halo--three"></div>
          <div class="visual-noise"></div>
          <div class="capsule-shell-float">
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
  <div ${withReveal({ classes: "section-heading", direction: "left", delay: 90, duration: 0.98 })}>
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
        .map((item, index) => {
          const direction = getRevealDirection(index, CARD_REVEAL_PATTERN);
          return `
            <article ${withReveal({
              classes: "info-card glass-card",
              direction,
              delay: 170 + index * STAGGER_STEP,
              duration: 0.95,
            })}>
              <span class="card-eyebrow">${item.eyebrow}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              ${item.meta ? `<span class="card-meta">${item.meta}</span>` : ""}
            </article>
          `;
        })
        .join("")}
    </div>
  </section>
`;

const renderProjectsSection = (section) => `
  <section class="content-section section-projects-shell">
    ${renderSectionHeading(section)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map((item, index) => {
          const direction = getRevealDirection(index, ALT_CARD_REVEAL_PATTERN);
          return `
            <article ${withReveal({
              classes: "project-card glass-card",
              direction,
              delay: 170 + index * STAGGER_STEP,
              duration: 0.98,
            })}>
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
          `;
        })
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
            <article ${withReveal({
              classes: "metric-card glass-card",
              direction: "up",
              delay: 160 + index * STAGGER_STEP,
              duration: 0.9,
            })}>
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
            <article ${withReveal({
              classes: "timeline-card glass-card",
              direction: index % 2 === 0 ? "left" : "right",
              delay: 170 + index * STAGGER_STEP,
              duration: 1.0,
            })}>
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
            <article ${withReveal({
              classes: `orbit-node orbit-node--${index + 1} glass-card`,
              direction: index % 2 === 0 ? "left" : "right",
              delay: 170 + index * 100,
              duration: 1.0,
            })}>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `
        )
        .join("")}
      <div ${withReveal({ classes: "orbit-core glass-card", direction: "up", delay: 320, duration: 1.05 })}>
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article ${withReveal({ classes: "quote-card glass-card", direction: "up", delay: 160, duration: 1.0 })}>
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
    <article ${withReveal({ classes: "cta-card glass-card", direction: "up", delay: 160, duration: 1.05 })}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 280, duration: 0.92 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 350, duration: 0.92 })}
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
  <div ${withReveal({ classes: "footer-inner glass-card", direction: "up", delay: 120, duration: 1.02 })}>
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

const revealOnScroll = () => {
  const revealTargets = [...document.querySelectorAll("[data-reveal]")];
  if (!revealTargets.length) return;

  if (prefersReducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotionQuery.matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = 0;
  const ease = 0.14;

  const animate = () => {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    visual.style.setProperty("--move-x", `${currentX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${currentY.toFixed(2)}px`);

    if (Math.abs(targetX - currentX) < 0.12 && Math.abs(targetY - currentY) < 0.12) {
      visual.style.setProperty("--move-x", `${targetX.toFixed(2)}px`);
      visual.style.setProperty("--move-y", `${targetY.toFixed(2)}px`);
      rafId = 0;
      return;
    }

    rafId = window.requestAnimationFrame(animate);
  };

  const requestTick = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(animate);
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    requestTick();
  });

  visual.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    requestTick();
  });
};

const initHeroParallax = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  const chips = [...visual.querySelectorAll(".code-chip")];
  if (prefersReducedMotionQuery.matches) {
    visual.style.setProperty("--scroll-shift-x", "0px");
    visual.style.setProperty("--scroll-shift-y", "0px");
    visual.style.setProperty("--scroll-tilt", "0deg");
    chips.forEach((chip) => {
      chip.style.setProperty("--chip-shift-x", "0px");
      chip.style.setProperty("--chip-shift-y", "0px");
    });
    return;
  }

  let rafId = 0;
  const update = () => {
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const normalized = Math.max(
      -1,
      Math.min(1, (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight)
    );
    const mobileScale = window.innerWidth < 860 ? 0.68 : 1;
    const shiftY = -normalized * 16 * mobileScale;
    const shiftX = normalized * 4 * mobileScale;
    const tilt = normalized * 1.5 * mobileScale;

    visual.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${tilt.toFixed(2)}deg`);

    chips.forEach((chip, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      chip.style.setProperty("--chip-shift-x", `${(shiftX * 0.45 * direction).toFixed(2)}px`);
      chip.style.setProperty("--chip-shift-y", `${(shiftY * (0.35 + index * 0.03)).toFixed(2)}px`);
    });

    rafId = 0;
  };

  const requestUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initPointerMotion();
initHeroParallax();

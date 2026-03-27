const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealStyle = (delay = 0, duration = 950) => {
  const clampedDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;
  const clampedDuration = Number.isFinite(duration) ? Math.min(1200, Math.max(800, duration)) : 950;
  return ` style="--reveal-delay: ${clampedDelay}ms; --reveal-duration: ${clampedDuration}ms;"`;
};

const staggerDelay = (index, start = 0, step = 90) => start + index * step;
const cycleDirection = (index) => ["left", "right", "up"][index % 3];
const orbitDirection = (index) => (index % 2 === 0 ? "left" : "right");

const buttonMarkup = (action, tone = "primary", reveal = null) => {
  if (!action) return "";
  const revealClass = reveal ? ` reveal-${reveal.direction || "up"}` : "";
  const motionStyle = reveal ? revealStyle(reveal.delay ?? 0, reveal.duration ?? 940) : "";
  return `<a class="button button--${tone}${revealClass}" href="${action.href}"${motionStyle}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div class="header-inner reveal-up"${revealStyle(40, 860)}>
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
      <div class="hero-topline reveal-left"${revealStyle(80, 900)}>
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1 class="reveal-left"${revealStyle(160, 1120)}>${hero.title}</h1>
      <p class="reveal-left"${revealStyle(240, 1000)}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 320, duration: 900 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 390, duration: 940 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map((stat, index) => {
            const delay = staggerDelay(index, 460, 90);
            const duration = 900 + index * 80;
            return `
              <article class="stat-card glass-card reveal-up"${revealStyle(delay, duration)}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article class="hero-side-card glass-card reveal-right"${revealStyle(240, 980)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div class="hero-visual reveal-right"${revealStyle(320, 1140)}>
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
    <section class="marquee-band reveal-up" aria-label="Technology marquee"${revealStyle(180, 900)}>
      <div class="marquee-track">${items}</div>
    </section>
  `;
};

const renderSectionHeading = (section, direction = "left", delay = 80) => `
  <div class="section-heading reveal-${direction}"${revealStyle(delay, 980)}>
    <span class="section-kicker">${section.kicker}</span>
    ${section.title ? `<h2>${section.title}</h2>` : ""}
    ${section.copy ? `<p>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section, "left", 90)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map((item, index) => {
          const direction = cycleDirection(index);
          const delay = staggerDelay(index, 170, 85);
          const duration = 880 + (index % 3) * 120;
          return `
            <article class="info-card glass-card reveal-${direction}"${revealStyle(delay, duration)}>
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
    ${renderSectionHeading(section, "left", 90)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map((item, index) => {
          const direction = ["left", "right", "up", "up"][index % 4];
          const delay = staggerDelay(index, 170, 90);
          const duration = 900 + (index % 2) * 100;
          return `
            <article class="project-card glass-card reveal-${direction}"${revealStyle(delay, duration)}>
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
    ${renderSectionHeading(section, "left", 90)}
    <div class="metric-grid">
      ${section.items
        .map((item, index) => {
          const delay = staggerDelay(index, 160, 90);
          const duration = 860 + index * 80;
          return `
            <article class="metric-card glass-card reveal-up"${revealStyle(delay, duration)}>
              <strong>${item.value}</strong>
              <span>${item.label}</span>
            </article>
          `;
        })
        .join("")}
    </div>
  </section>
`;

const renderTimelineSection = (section) => `
  <section class="content-section timeline-shell">
    ${renderSectionHeading(section, "left", 90)}
    <div class="timeline-grid">
      ${section.items
        .map((item, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          const delay = staggerDelay(index, 160, 90);
          const duration = 900 + (index % 2) * 120;
          return `
            <article class="timeline-card glass-card reveal-${direction}"${revealStyle(delay, duration)}>
              <span class="timeline-phase">${item.phase}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `;
        })
        .join("")}
    </div>
  </section>
`;

const renderOrbitSection = (section) => `
  <section class="content-section orbit-shell">
    ${renderSectionHeading(section, "left", 90)}
    <div class="orbit-stage reveal-up"${revealStyle(150, 1060)}>
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      ${section.items
        .map((item, index) => {
          const direction = orbitDirection(index);
          const delay = staggerDelay(index, 220, 85);
          const duration = 920 + (index % 2) * 110;
          return `<article class="orbit-node orbit-node--${index + 1} glass-card reveal-${direction}"${revealStyle(delay, duration)}><h3>${item.title}</h3><p>${item.text}</p></article>`;
        })
        .join("")}
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
    <article class="quote-card glass-card reveal-up"${revealStyle(140, 1000)}>
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
    <article class="cta-card glass-card reveal-up"${revealStyle(130, 1020)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 250, duration: 900 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 330, duration: 940 })}
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
    <div class="reveal-left"${revealStyle(70, 960)}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div class="footer-links reveal-up"${revealStyle(160, 900)}>
      ${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
    </div>
    <div class="footer-meta reveal-right"${revealStyle(230, 960)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealTargets = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
  if (!revealTargets.length) return;

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
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
      rootMargin: "0px 0px 10% 0px",
    }
  );
  revealTargets.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion.matches) return;

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    visual.style.setProperty("--move-x", `${offsetX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${offsetY.toFixed(2)}px`);
  });
  visual.addEventListener("pointerleave", () => {
    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
  });
};

const initHeroScrollParallax = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  if (prefersReducedMotion.matches) {
    visual.style.setProperty("--scroll-shift-y", "0px");
    visual.style.setProperty("--scroll-shift-x", "0px");
    visual.style.setProperty("--scroll-tilt", "0deg");
    return;
  }

  let isTicking = false;

  const applyParallax = () => {
    isTicking = false;
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const centerOffset = rect.top + rect.height * 0.5 - viewportHeight * 0.5;
    const normalizedOffset = Math.max(-1, Math.min(1, centerOffset / (viewportHeight * 0.75)));

    const shiftY = -18 * normalizedOffset;
    const shiftX = 4 * normalizedOffset;
    const tilt = -1.3 * normalizedOffset;

    visual.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${tilt.toFixed(2)}deg`);
  };

  const queueParallax = () => {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(applyParallax);
  };

  queueParallax();
  window.addEventListener("scroll", queueParallax, { passive: true });
  window.addEventListener("resize", queueParallax);
};

if (headerHost) {
  headerHost.innerHTML = renderHeader();
}

if (app) {
  app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
}

if (footerHost) {
  footerHost.innerHTML = renderFooter();
}

const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

revealOnScroll();
initPointerMotion();
initHeroScrollParallax();

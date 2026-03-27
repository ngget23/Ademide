const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');

const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const revealAttrs = (baseClass, direction = "up", delay = 0) => {
  const className = [baseClass, `reveal-${direction}`].filter(Boolean).join(" ");
  return `class="${className}" style="--reveal-delay: ${delay}ms;"`;
};

const buttonMarkup = (action, tone = "primary", revealConfig) => {
  if (!action) return "";
  const revealClass = revealConfig ? ` reveal-${revealConfig.direction || "up"}` : "";
  const revealDelay = revealConfig ? ` style="--reveal-delay: ${revealConfig.delay || 0}ms;"` : "";
  return `<a class="button button--${tone}${revealClass}" href="${action.href}"${revealDelay}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${revealAttrs("header-inner", "up", 40)}>
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
    <div ${revealAttrs("hero-copy", "left", 80)}>
      <div class="hero-topline">
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1>${hero.title}</h1>
      <p>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 220 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 300 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${revealAttrs("stat-card glass-card", "up", 320 + index * 80)}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${revealAttrs("hero-side-card glass-card", "right", 170)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${revealAttrs("hero-visual", "right", 250)}>
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
  <div ${revealAttrs("section-heading", "left", 50)}>
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
            <article ${revealAttrs("info-card glass-card", "up", 140 + index * 80)}>
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
            <article ${revealAttrs("project-card glass-card", "up", 140 + index * 90)}>
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
            <article ${revealAttrs("metric-card glass-card", "up", 130 + index * 75)}>
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
            <article ${revealAttrs("timeline-card glass-card", "up", 130 + index * 75)}>
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
    <div ${revealAttrs("orbit-stage", "up", 90)}>
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      <article ${revealAttrs("orbit-node orbit-node--1 glass-card", "left", 170)}><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article ${revealAttrs("orbit-node orbit-node--2 glass-card", "right", 240)}><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article ${revealAttrs("orbit-node orbit-node--3 glass-card", "left", 300)}><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article ${revealAttrs("orbit-node orbit-node--4 glass-card", "right", 360)}><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
      <div ${revealAttrs("orbit-core-wrap", "up", 220)}>
        <div class="orbit-core glass-card">
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
    <article ${revealAttrs("quote-card glass-card", "up", 120)}>
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
    <article ${revealAttrs("cta-card glass-card", "up", 120)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 220 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 300 })}
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
    <div ${revealAttrs("", "up", 90)}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div ${revealAttrs("footer-links", "up", 170)}>
      ${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
    </div>
    <div ${revealAttrs("footer-meta", "up", 240)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealTargets = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
  if (!revealTargets.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
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
      threshold: 0.14,
      rootMargin: "0px 0px -12% 0px"
    }
  );
  revealTargets.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  if (prefersReducedMotion()) return;
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  let pointerFrame = null;
  let moveX = 0;
  let moveY = 0;

  const commitPointerPosition = () => {
    pointerFrame = null;
    visual.style.setProperty("--move-x", `${moveX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${moveY.toFixed(2)}px`);
  };

  const queuePointerUpdate = () => {
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(commitPointerPosition);
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    queuePointerUpdate();
  });

  visual.addEventListener("pointerleave", () => {
    moveX = 0;
    moveY = 0;
    queuePointerUpdate();
  });
};

const initHeroParallax = () => {
  if (prefersReducedMotion()) return;

  const visual = document.querySelector(".hero-visual");
  if (!visual) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const viewportWidth = window.innerWidth || 1;

    const normalizedY = ((rect.top + rect.height * 0.5) - viewportHeight * 0.5) / viewportHeight;
    const normalizedX = ((rect.left + rect.width * 0.5) - viewportWidth * 0.5) / viewportWidth;
    const clampedY = Math.max(-1, Math.min(1, normalizedY));
    const clampedX = Math.max(-1, Math.min(1, normalizedX));

    const shiftY = -clampedY * 12;
    const shiftX = -clampedX * 4;
    const tilt = -clampedY * 1.2;

    visual.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${tilt.toFixed(2)}deg`);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
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
initHeroParallax();
initPointerMotion();

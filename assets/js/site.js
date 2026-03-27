const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealClassByDirection = {
  left: "reveal-left",
  right: "reveal-right",
  up: "reveal-up",
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const staggerDelay = (index, base = 120, step = 90) => base + index * step;

const motionStyleAttr = ({ delay = 0, duration } = {}) => {
  const styles = [];
  if (typeof delay === "number") styles.push(`--reveal-delay:${delay}ms`);
  if (typeof duration === "number") styles.push(`--reveal-duration:${duration}ms`);
  return styles.length ? ` style="${styles.join(";")}"` : "";
};

const revealAttr = (baseClass = "", options = {}) => {
  const direction = options.direction || "up";
  const revealClass = revealClassByDirection[direction] || revealClassByDirection.up;
  const classes = [baseClass, revealClass].filter(Boolean).join(" ");
  return `class="${classes}"${motionStyleAttr(options)}`;
};

const buttonMarkup = (action, tone = "primary", motion = {}) => {
  if (!action) return "";
  const direction = motion.direction || "up";
  const revealClass = revealClassByDirection[direction] || revealClassByDirection.up;
  return `<a class="button button--${tone} ${revealClass}"${motionStyleAttr(motion)} href="${action.href}">${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div ${revealAttr("header-inner", { direction: "up", delay: 40, duration: 860 })}>
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
    <a ${revealAttr("mini-cta", { direction: "up", delay: 170, duration: 900 })} href="contact.html">Book Build</a>
  </div>
`;

const renderHero = (hero) => `
  <section class="hero">
    <div class="hero-copy">
      <div ${revealAttr("hero-topline", { direction: "left", delay: 120, duration: 980 })}>
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1 ${revealAttr("", { direction: "left", delay: 200, duration: 1120 })}>${hero.title}</h1>
      <p ${revealAttr("", { direction: "left", delay: 290, duration: 1040 })}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 360, duration: 920 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 460, duration: 960 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article ${revealAttr("stat-card glass-card", { direction: "up", delay: staggerDelay(index, 510, 90), duration: 920 })}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article ${revealAttr("hero-side-card glass-card", { direction: "right", delay: 230, duration: 1020 })}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div ${revealAttr("hero-visual", { direction: "right", delay: 330, duration: 1160 })}>
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
    <section ${revealAttr("marquee-band", { direction: "up", delay: 110, duration: 900 })} aria-label="Technology marquee">
      <div class="marquee-track">${items}</div>
    </section>
  `;
};

const renderSectionHeading = (section, delay = 70) => `
  <div ${revealAttr("section-heading", { direction: "left", delay, duration: 1000 })}>
    <span class="section-kicker">${section.kicker}</span>
    ${section.title ? `<h2>${section.title}</h2>` : ""}
    ${section.copy ? `<p>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section, 80)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article ${revealAttr("info-card glass-card", { direction: "up", delay: staggerDelay(index, 170, 90), duration: 940 })}>
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
    ${renderSectionHeading(section, 80)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map(
          (item, index) => `
            <article ${revealAttr("project-card glass-card", {
              direction: index % 2 === 0 ? "left" : "right",
              delay: staggerDelay(index, 170, 100),
              duration: 980,
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
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderMetricsSection = (section) => `
  <section class="content-section metrics-shell">
    ${renderSectionHeading(section, 80)}
    <div class="metric-grid">
      ${section.items
        .map(
          (item, index) => `
            <article ${revealAttr("metric-card glass-card", {
              direction: "up",
              delay: staggerDelay(index, 180, 90),
              duration: 900,
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
    ${renderSectionHeading(section, 80)}
    <div class="timeline-grid">
      ${section.items
        .map(
          (item, index) => `
            <article ${revealAttr("timeline-card glass-card", {
              direction: index % 2 === 0 ? "left" : "right",
              delay: staggerDelay(index, 180, 90),
              duration: 980,
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
    ${renderSectionHeading(section, 80)}
    <div class="orbit-stage">
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      <article ${revealAttr("orbit-node orbit-node--1 glass-card", { direction: "left", delay: 190, duration: 980 })}><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article ${revealAttr("orbit-node orbit-node--2 glass-card", { direction: "right", delay: 260, duration: 980 })}><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article ${revealAttr("orbit-node orbit-node--3 glass-card", { direction: "left", delay: 330, duration: 980 })}><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article ${revealAttr("orbit-node orbit-node--4 glass-card", { direction: "right", delay: 400, duration: 980 })}><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
      <div ${revealAttr("orbit-core glass-card", { direction: "up", delay: 230, duration: 940 })}>
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article ${revealAttr("quote-card glass-card", { direction: "up", delay: 100, duration: 980 })}>
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
    <article ${revealAttr("cta-card glass-card", { direction: "up", delay: 90, duration: 1020 })}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 210, duration: 900 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 300, duration: 940 })}
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
  <div ${revealAttr("footer-inner glass-card", { direction: "up", delay: 100, duration: 960 })}>
    <div ${revealAttr("", { direction: "left", delay: 170, duration: 1000 })}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div class="footer-links">
      ${data.navigation
        .map(
          (item, index) =>
            `<a ${revealAttr("", { direction: "up", delay: staggerDelay(index, 220, 45), duration: 860 })} href="${item.href}">${item.label}</a>`
        )
        .join("")}
    </div>
    <div ${revealAttr("footer-meta", { direction: "right", delay: 260, duration: 980 })}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
  if (!revealElements.length) return;

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
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
      rootMargin: "0px 0px -12% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const initHeroMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion) return;

  let frame = 0;
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerCurrentX = 0;
  let pointerCurrentY = 0;
  let scrollTargetY = 0;
  let scrollCurrentY = 0;

  const runMotionFrame = () => {
    const pointerDeltaX = pointerTargetX - pointerCurrentX;
    const pointerDeltaY = pointerTargetY - pointerCurrentY;
    const scrollDeltaY = scrollTargetY - scrollCurrentY;

    pointerCurrentX += pointerDeltaX * 0.15;
    pointerCurrentY += pointerDeltaY * 0.15;
    scrollCurrentY += scrollDeltaY * 0.12;

    visual.style.setProperty("--move-x", `${pointerCurrentX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${pointerCurrentY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-y", `${scrollCurrentY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${(scrollCurrentY * -0.08).toFixed(3)}deg`);

    if (Math.abs(pointerDeltaX) > 0.05 || Math.abs(pointerDeltaY) > 0.05 || Math.abs(scrollDeltaY) > 0.05) {
      frame = window.requestAnimationFrame(runMotionFrame);
      return;
    }

    frame = 0;
  };

  const requestMotionFrame = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(runMotionFrame);
  };

  const updateScrollTarget = () => {
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const heroCenterOffset = viewportHeight * 0.5 - (rect.top + rect.height * 0.5);
    const normalizedOffset = clamp(heroCenterOffset / viewportHeight, -1, 1);
    scrollTargetY = normalizedOffset * 18;
    requestMotionFrame();
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    requestMotionFrame();
  });

  visual.addEventListener("pointerleave", () => {
    pointerTargetX = 0;
    pointerTargetY = 0;
    requestMotionFrame();
  });

  window.addEventListener("scroll", updateScrollTarget, { passive: true });
  window.addEventListener("resize", updateScrollTarget);
  updateScrollTarget();
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initHeroMotion();

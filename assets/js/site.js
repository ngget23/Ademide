const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

const prefersReducedMotion = () => motionPreference.matches;
const revealClass = (direction = "up") => `reveal-${direction}`;
const withRevealClass = (baseClasses, direction = "up") => `${baseClasses} ${revealClass(direction)}`;
const staggerDelay = (index, step = 90, start = 0) => start + index * step;

const motionStyle = (delay = 0, duration = "") => {
  const declarations = [];
  if (delay > 0) declarations.push(`--reveal-delay: ${delay}ms`);
  if (duration) declarations.push(`--reveal-duration: ${duration}`);
  return declarations.length ? ` style="${declarations.join("; ")};"` : "";
};

const buttonMarkup = (action, tone = "primary", motion = null) => {
  if (!action) return "";
  const motionClass = motion ? ` ${revealClass(motion.direction || "up")}` : "";
  const motionAttrs = motion
    ? ` data-reveal${motionStyle(motion.delay || 0, motion.duration || "")}`
    : "";
  return `<a class="button button--${tone}${motionClass}" href="${action.href}"${motionAttrs}>${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div class="${withRevealClass("header-inner", "up")}" data-reveal${motionStyle(70, "0.86s")}>
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
      <div class="${withRevealClass("hero-topline", "left")}" data-reveal${motionStyle(90)}>
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1 class="${revealClass("left")}" data-reveal${motionStyle(170, "1.08s")}>${hero.title}</h1>
      <p class="${revealClass("left")}" data-reveal${motionStyle(240)}>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", { direction: "up", delay: 310 })}
        ${buttonMarkup(hero.secondaryAction, "secondary", { direction: "up", delay: 390 })}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article class="${withRevealClass("stat-card glass-card", "up")}" data-reveal${motionStyle(
                staggerDelay(index, 95, 460)
              )}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article class="${withRevealClass("hero-side-card glass-card", "right")}" data-reveal${motionStyle(220)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div class="${withRevealClass("hero-visual", "right")}" data-reveal${motionStyle(300, "1.1s")}>
        <div class="hero-parallax-layer" data-parallax-depth="0.35">
          <div class="halo halo--one"></div>
          <div class="halo halo--two"></div>
          <div class="halo halo--three"></div>
          <div class="visual-noise"></div>
        </div>
        <div class="hero-parallax-layer" data-parallax-depth="0.72">
          <div class="capsule-float">
            <div class="capsule-shell">
              <div class="capsule-top"></div>
              <div class="capsule-screens">
                <div class="capsule-screen"></div>
                <div class="capsule-screen capsule-screen--tall"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-parallax-layer" data-parallax-depth="1">
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

const renderSectionHeading = (section, delay = 80) => `
  <div class="${withRevealClass("section-heading", "left")}" data-reveal${motionStyle(delay, "1s")}>
    <span class="section-kicker">${section.kicker}</span>
    ${section.title ? `<h2>${section.title}</h2>` : ""}
    ${section.copy ? `<p>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section, 70)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article class="${withRevealClass("info-card glass-card", "up")}" data-reveal${motionStyle(
              staggerDelay(index, 90, 140)
            )}>
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
    ${renderSectionHeading(section, 70)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map(
          (item, index) => `
            <article class="${withRevealClass("project-card glass-card", "up")}" data-reveal${motionStyle(
              staggerDelay(index, 95, 150)
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
    ${renderSectionHeading(section, 70)}
    <div class="metric-grid">
      ${section.items
        .map(
          (item, index) => `
            <article class="${withRevealClass("metric-card glass-card", "up")}" data-reveal${motionStyle(
              staggerDelay(index, 85, 130)
            )}>
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
    ${renderSectionHeading(section, 70)}
    <div class="timeline-grid">
      ${section.items
        .map(
          (item, index) => `
            <article class="${withRevealClass("timeline-card glass-card", "up")}" data-reveal${motionStyle(
              staggerDelay(index, 95, 150)
            )}>
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
    ${renderSectionHeading(section, 70)}
    <div class="orbit-stage">
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      ${section.items
        .map(
          (item, index) => `
            <article class="${withRevealClass(
              `orbit-node orbit-node--${index + 1} glass-card`,
              index % 2 === 0 ? "left" : "right"
            )}" data-reveal${motionStyle(staggerDelay(index, 90, 150))}>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `
        )
        .join("")}
      <div class="${withRevealClass("orbit-core glass-card", "up")}" data-reveal${motionStyle(290)}>
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article class="${withRevealClass("quote-card glass-card", "up")}" data-reveal${motionStyle(90, "1.04s")}>
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
    <article class="${withRevealClass("cta-card glass-card", "up")}" data-reveal${motionStyle(90, "1.06s")}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", { direction: "up", delay: 160 })}
        ${buttonMarkup(section.secondaryAction, "secondary", { direction: "up", delay: 240 })}
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
    <div class="${revealClass("left")}" data-reveal${motionStyle(80)}>
      <span class="section-kicker">${data.brand.role}</span>
      <h2>${data.brand.name}</h2>
      <p>${data.brand.blurb}</p>
    </div>
    <div class="footer-links">
      ${data.navigation
        .map(
          (item, index) =>
            `<a class="${revealClass("up")}" href="${item.href}" data-reveal${motionStyle(
              staggerDelay(index, 55, 150)
            )}>${item.label}</a>`
        )
        .join("")}
    </div>
    <div class="${withRevealClass("footer-meta", "right")}" data-reveal${motionStyle(280)}>
      <span>Built locally</span>
      <span id="footer-year"></span>
    </div>
  </div>
`;

const revealOnScroll = () => {
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (!revealTargets.length) return;

  if (prefersReducedMotion()) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -12% 0px" }
  );

  revealTargets.forEach((element) => observer.observe(element));
};

const initHeroParallax = () => {
  const hero = document.querySelector(".hero");
  const visual = document.querySelector(".hero-visual");
  if (!hero || !visual || prefersReducedMotion()) return;

  const layers = Array.from(visual.querySelectorAll(".hero-parallax-layer"));
  if (!layers.length) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let rafId = 0;

  const update = () => {
    rafId = 0;
    const heroBounds = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = clamp((viewportHeight * 0.62 - heroBounds.top) / (viewportHeight * 1.24), -1, 1);

    layers.forEach((layer) => {
      const depth = Number(layer.dataset.parallaxDepth || "0.5");
      const shiftY = progress * 16 * depth;
      const shiftX = progress * -6 * depth;
      layer.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
      layer.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    });
  };

  const queueUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  queueUpdate();
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || prefersReducedMotion()) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;
    visual.style.setProperty("--move-x", `${currentX.toFixed(2)}px`);
    visual.style.setProperty("--move-y", `${currentY.toFixed(2)}px`);

    if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
      rafId = window.requestAnimationFrame(render);
      return;
    }

    rafId = 0;
  };

  const queueRender = () => {
    if (!rafId) rafId = window.requestAnimationFrame(render);
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    targetX = normalizedX * 14;
    targetY = normalizedY * 12;
    queueRender();
  });

  const resetPointerMotion = () => {
    targetX = 0;
    targetY = 0;
    queueRender();
  };

  visual.addEventListener("pointerleave", resetPointerMotion);
  visual.addEventListener("pointercancel", resetPointerMotion);
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initHeroParallax();
initPointerMotion();

const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');
const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealSelector = "[data-reveal], .reveal-left, .reveal-right, .reveal-up";

const revealDelayStyle = (delay = 0) => ` style="--reveal-delay: ${delay}ms;"`;
const revealClass = (direction = "up") => `reveal-${direction}`;
const staggerDelay = (index, base = 80, step = 85) => base + index * step;

const chipFloatClasses = ["hero-chip-float-a", "hero-chip-float-b", "hero-chip-float-c"];
const chipDepthClasses = ["hero-parallax-soft", "hero-parallax-medium"];

const buttonMarkup = (action, tone = "primary", direction = "up", delay = 0) => {
  if (!action) return "";
  return `<a class="button button--${tone} ${revealClass(direction)}"${revealDelayStyle(delay)} href="${
    action.href
  }">${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map(
      (item, index) => `
        <span
          class="code-chip code-chip--${index + 1} hero-parallax-layer ${
        chipDepthClasses[index % chipDepthClasses.length]
      } ${chipFloatClasses[index % chipFloatClasses.length]} ${revealClass("up")}"
          ${revealDelayStyle(staggerDelay(index, 250, 60))}
        >
          ${item}
        </span>
      `
    )
    .join("");

const renderHeader = () => `
  <div class="header-inner ${revealClass("up")} reveal-on-load" ${revealDelayStyle(50)}>
    <a class="brand ${revealClass("left")} reveal-on-load" ${revealDelayStyle(110)} href="index.html" aria-label="Ademide home">
      <span class="brand-mark">${data.brand.mark}</span>
      <span class="brand-copy">
        <strong>${data.brand.name}</strong>
        <small>${data.brand.role}</small>
      </span>
    </a>
    <nav class="site-nav" aria-label="Primary navigation">
      ${data.navigation
        .map(
          (item, index) =>
            `<a class="nav-link ${item.id === pageId ? "is-active" : ""} ${revealClass("up")} reveal-on-load" ${revealDelayStyle(
              staggerDelay(index, 140, 40)
            )} href="${item.href}" ${item.id === pageId ? 'aria-current="page"' : ""}>${item.label}</a>`
        )
        .join("")}
    </nav>
    <a class="mini-cta ${revealClass("right")} reveal-on-load" ${revealDelayStyle(280)} href="contact.html">Book Build</a>
  </div>
`;

const renderHero = (hero) => `
  <section class="hero">
    <div class="hero-copy ${revealClass("left")}" ${revealDelayStyle(100)}>
      <div class="hero-topline">
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1>${hero.title}</h1>
      <p>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary", "up", 210)}
        ${buttonMarkup(hero.secondaryAction, "secondary", "up", 280)}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat, index) => `
              <article class="stat-card glass-card ${revealClass("up")}" ${revealDelayStyle(staggerDelay(index, 300, 80))}>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article class="hero-side-card glass-card ${revealClass("right")}" ${revealDelayStyle(170)}>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div class="hero-visual ${revealClass("right")}" ${revealDelayStyle(230)}>
        <div class="halo halo--one hero-parallax-layer hero-parallax-soft"></div>
        <div class="halo halo--two hero-parallax-layer hero-parallax-medium"></div>
        <div class="halo halo--three hero-parallax-layer hero-parallax-soft"></div>
        <div class="visual-noise hero-parallax-layer hero-parallax-soft"></div>
        <div class="capsule-shell hero-parallax-layer hero-parallax-core">
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

const renderSectionHeading = (section, delay = 70) => `
  <div class="section-heading ${revealClass("left")}" ${revealDelayStyle(delay)}>
    <span class="section-kicker">${section.kicker}</span>
    ${section.title ? `<h2>${section.title}</h2>` : ""}
    ${section.copy ? `<p>${section.copy}</p>` : ""}
  </div>
`;

const renderGridSection = (section) => `
  <section class="content-section section-grid-shell">
    ${renderSectionHeading(section, 60)}
    <div class="card-grid card-grid--generic">
      ${section.items
        .map(
          (item, index) => `
            <article class="info-card glass-card ${revealClass("up")}" ${revealDelayStyle(staggerDelay(index, 90, 85))}>
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
    ${renderSectionHeading(section, 60)}
    <div class="card-grid card-grid--projects">
      ${section.items
        .map(
          (item, index) => `
            <article class="project-card glass-card ${revealClass(index % 2 === 0 ? "left" : "right")}" ${revealDelayStyle(
              staggerDelay(index, 90, 90)
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
    ${renderSectionHeading(section, 60)}
    <div class="metric-grid">
      ${section.items
        .map(
          (item, index) => `
            <article class="metric-card glass-card ${revealClass("up")}" ${revealDelayStyle(staggerDelay(index, 100, 80))}>
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
    ${renderSectionHeading(section, 60)}
    <div class="timeline-grid">
      ${section.items
        .map(
          (item, index) => `
            <article class="timeline-card glass-card ${revealClass(index % 2 === 0 ? "right" : "left")}" ${revealDelayStyle(
              staggerDelay(index, 90, 90)
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
    ${renderSectionHeading(section, 60)}
    <div class="orbit-stage ${revealClass("up")}" ${revealDelayStyle(90)}>
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      <article class="orbit-node orbit-node--1 glass-card ${revealClass("left")}" ${revealDelayStyle(150)}><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article class="orbit-node orbit-node--2 glass-card ${revealClass("right")}" ${revealDelayStyle(220)}><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article class="orbit-node orbit-node--3 glass-card ${revealClass("left")}" ${revealDelayStyle(290)}><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article class="orbit-node orbit-node--4 glass-card ${revealClass("right")}" ${revealDelayStyle(360)}><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
      <div class="orbit-core glass-card ${revealClass("up")} orbit-core-reveal" ${revealDelayStyle(430)}>
        <span class="card-eyebrow">${section.center.eyebrow}</span>
        <h3>${section.center.title}</h3>
        <p>${section.center.text}</p>
      </div>
    </div>
  </section>
`;

const renderQuoteSection = (section) => `
  <section class="content-section quote-shell">
    <article class="quote-card glass-card ${revealClass("up")}" ${revealDelayStyle(90)}>
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
    <article class="cta-card glass-card ${revealClass("up")}" ${revealDelayStyle(90)}>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary", "up", 180)}
        ${buttonMarkup(section.secondaryAction, "secondary", "up", 250)}
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
  <div class="footer-inner glass-card ${revealClass("up")}" ${revealDelayStyle(80)}>
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

const initLoadReveals = () => {
  const loadRevealElements = [...document.querySelectorAll(".reveal-on-load")];
  if (!loadRevealElements.length) return;
  if (isReducedMotion) {
    loadRevealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  window.requestAnimationFrame(() => {
    loadRevealElements.forEach((element, index) => {
      window.setTimeout(() => {
        element.classList.add("is-visible");
      }, 45 + index * 45);
    });
  });
};

const revealOnScroll = () => {
  const revealElements = [...document.querySelectorAll(revealSelector)];
  if (!revealElements.length) return;
  if (isReducedMotion || !("IntersectionObserver" in window)) {
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
      threshold: 0.14,
      rootMargin: "0px 0px -12% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || isReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

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

const initHeroParallax = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || isReducedMotion) return;

  let ticking = false;
  const updateParallax = () => {
    const rect = visual.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const centered = (clampedProgress - 0.5) * 2;
    const shiftY = centered * -14;
    const shiftX = centered * 4;

    visual.style.setProperty("--scroll-shift-y", `${shiftY.toFixed(2)}px`);
    visual.style.setProperty("--scroll-shift-x", `${shiftX.toFixed(2)}px`);
    visual.style.setProperty("--scroll-tilt", `${(centered * 1.4).toFixed(2)}deg`);
    ticking = false;
  };

  const requestParallaxFrame = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestParallaxFrame, { passive: true });
  window.addEventListener("resize", requestParallaxFrame);
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
initLoadReveals();
revealOnScroll();
initPointerMotion();
initHeroParallax();

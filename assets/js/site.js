const data = window.PORTFOLIO_DATA;
const pageId = document.body.dataset.page || "index";
const page = data.pages[pageId] || data.pages.index;
const app = document.getElementById("app");
const headerHost = document.querySelector('[data-shell="header"]');
const footerHost = document.querySelector('[data-shell="footer"]');

const buttonMarkup = (action, tone = "primary") => {
  if (!action) return "";
  return `<a class="button button--${tone}" href="${action.href}">${action.label}</a>`;
};

const pillsMarkup = (items) =>
  items
    .map((item, index) => `<span class="code-chip code-chip--${index + 1}">${item}</span>`)
    .join("");

const renderHeader = () => `
  <div class="header-inner">
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
    <div class="hero-copy" data-reveal>
      <div class="hero-topline">
        <span class="eyebrow">${hero.eyebrow}</span>
        <span class="handle">${hero.handle}</span>
      </div>
      <h1>${hero.title}</h1>
      <p>${hero.lead}</p>
      <div class="hero-actions">
        ${buttonMarkup(hero.primaryAction, "primary")}
        ${buttonMarkup(hero.secondaryAction, "secondary")}
      </div>
      <div class="hero-stats">
        ${hero.stats
          .map(
            (stat) => `
              <article class="stat-card glass-card">
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <div class="hero-visual-column">
      <article class="hero-side-card glass-card" data-reveal>
        <span class="section-kicker">${hero.sideCard.eyebrow}</span>
        <h2>${hero.sideCard.title}</h2>
        <p>${hero.sideCard.copy}</p>
        <ul class="bullet-list">
          ${hero.sideCard.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
      <div class="hero-visual" data-reveal>
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
  <div class="section-heading" data-reveal>
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
          (item) => `
            <article class="info-card glass-card" data-reveal>
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
          (item) => `
            <article class="project-card glass-card" data-reveal>
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
          (item) => `
            <article class="metric-card glass-card" data-reveal>
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
          (item) => `
            <article class="timeline-card glass-card" data-reveal>
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
    <div class="orbit-stage" data-reveal>
      <div class="orbit-path orbit-path--one"></div>
      <div class="orbit-path orbit-path--two"></div>
      <div class="orbit-path orbit-path--three"></div>
      <article class="orbit-node orbit-node--1 glass-card"><h3>${section.items[0].title}</h3><p>${section.items[0].text}</p></article>
      <article class="orbit-node orbit-node--2 glass-card"><h3>${section.items[1].title}</h3><p>${section.items[1].text}</p></article>
      <article class="orbit-node orbit-node--3 glass-card"><h3>${section.items[2].title}</h3><p>${section.items[2].text}</p></article>
      <article class="orbit-node orbit-node--4 glass-card"><h3>${section.items[3].title}</h3><p>${section.items[3].text}</p></article>
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
    <article class="quote-card glass-card" data-reveal>
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
    <article class="cta-card glass-card" data-reveal>
      <span class="section-kicker">${section.kicker}</span>
      <h2>${section.title}</h2>
      <p>${section.copy}</p>
      <div class="hero-actions">
        ${buttonMarkup(section.primaryAction, "primary")}
        ${buttonMarkup(section.secondaryAction, "secondary")}
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.18 }
  );
  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
  window.setTimeout(() => {
    document
      .querySelectorAll("[data-reveal]:not(.is-visible)")
      .forEach((element) => element.classList.add("is-visible"));
  }, 1100);
};

const initPointerMotion = () => {
  const visual = document.querySelector(".hero-visual");
  if (!visual) return;
  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    visual.style.setProperty("--move-x", `${offsetX}px`);
    visual.style.setProperty("--move-y", `${offsetY}px`);
  });
  visual.addEventListener("pointerleave", () => {
    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
  });
};

headerHost.innerHTML = renderHeader();
app.innerHTML = `${renderHero(page.hero)}${renderMarquee()}${page.sections.map(renderSection).join("")}`;
footerHost.innerHTML = renderFooter();
document.getElementById("footer-year").textContent = new Date().getFullYear();
revealOnScroll();
initPointerMotion();

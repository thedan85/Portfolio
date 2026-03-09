/* ===================================================
   PORTFOLIO – index.js
   All personal data lives in profileConfig & projects.
   Edit those objects to customise the entire site.
   =================================================== */

// ─────────────────────────────────────────────────────
// ██  CONFIGURATION – EDIT YOUR PERSONAL DATA HERE  ██
// ─────────────────────────────────────────────────────

/**
 * profileConfig – single source of truth for every
 * piece of personal information shown on the site.
 *
 * CHANGE: name, taglines, intro, about, education,
 *         techStack, skills, social links, image, etc.
 */
const profileConfig = {
  // ---- Hero Section ----
  name: "Hứa Thế Dân",                        // CHANGE: your full name
  taglines: [                              // CHANGE: rotating tagline phrases
    "Backend Developer",
  ],
  intro:
    "I build elegant, performant web applications that solve real problems. " +
    "Passionate about clean code and great user experiences.",  // CHANGE: short intro paragraph
  profileImage: "https://i.pravatar.cc/300?img=47",            // CHANGE: path or URL to your photo

  // ---- About Section ----
  about: [
    "Hi! I'm Jane — a software engineer with 4+ years of experience crafting modern web applications.",
    "I love turning complex problems into simple, beautiful, and intuitive solutions.",
  ],  // CHANGE: about paragraphs (array of strings)

  education: [
    { degree: "Software Engineer", school: "Sai Gon University", year: "2023 – 2028" },
  ],  // CHANGE: education entries

  techStack: [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Python", "PostgreSQL", "Docker", "Git",
  ],  // CHANGE: short list of technologies for the About card



  // ---- Contact & Social Links ----
  email: "thedan639@gmail.com",                              // CHANGE: your email
  github: "https://github.com/thedan85",                   // CHANGE: GitHub profile URL
  linkedin: "https://linkedin.com/in/thedan85",            // CHANGE: LinkedIn profile URL          // CHANGE: Twitter / X profile URL (optional)
};

// ─────────────────────────────────────────────────────
// ██  PROJECTS – EDIT / ADD YOUR PROJECTS HERE       ██
// ─────────────────────────────────────────────────────

/**
 * projects – array of project objects.
 * Add, remove, or reorder entries to update the Projects section.
 *
 * Each object:
 *   title       – project name
 *   description – short summary
 *   tech        – array of technologies
 *   github      – GitHub repo URL
 *   demo        – live demo URL  (set "" to hide)
 */
const projects = [
  {
    title: "TaskFlow",
    description:
      "A drag-and-drop Kanban board with real-time collaboration, built with React and Firebase.",
    tech: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/janedoe/taskflow",
    demo: "https://taskflow-demo.vercel.app",
  },
  {
    title: "DevBlog",
    description:
      "A Markdown-powered developer blog with syntax highlighting and SEO optimization.",
    tech: ["Next.js", "MDX", "Vercel"],
    github: "https://github.com/janedoe/devblog",
    demo: "https://devblog-demo.vercel.app",
  },
  {
    title: "Budget Tracker",
    description:
      "Personal finance app with charts, categories, and CSV export. Fully offline with IndexedDB.",
    tech: ["JavaScript", "Chart.js", "IndexedDB"],
    github: "https://github.com/janedoe/budget-tracker",
    demo: "",
  },
  {
    title: "Weather CLI",
    description:
      "A lightweight command-line tool that fetches weather data from OpenWeatherMap API.",
    tech: ["Python", "Click", "REST API"],
    github: "https://github.com/janedoe/weather-cli",
    demo: "",
  },
];

// ─────────────────────────────────────────────────────
// ██  END OF CONFIGURATION – code below drives the UI ██
// ─────────────────────────────────────────────────────

/* ========== DOM HELPERS ========== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ========== POPULATE PAGE FROM CONFIG ========== */
function renderPage() {
  // Nav logo
  $("#nav-logo").innerHTML = '<i class="fas fa-home"></i>';

  // Hero
  $("#hero-name").textContent = profileConfig.name;
  $("#hero-intro").textContent = profileConfig.intro;

  // About – text
  const aboutTextEl = $("#about-text");
  profileConfig.about.forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    aboutTextEl.appendChild(el);
  });

  // About – education
  const eduEl = $("#about-education");
  profileConfig.education.forEach((e) => {
    const p = document.createElement("p");
    p.innerHTML =
      "<strong>" +
      escapeHtml(e.degree) +
      "</strong> — " +
      escapeHtml(e.school) +
      " (" +
      escapeHtml(e.year) +
      ")";
    eduEl.appendChild(p);
  });

  // About – tech stack badges
  const techEl = $("#about-tech");
  profileConfig.techStack.forEach((t) => {
    const span = document.createElement("span");
    span.className = "tech-badge";
    span.textContent = t;
    techEl.appendChild(span);
  });

  // Projects
  const grid = $("#projects-grid");
  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card reveal";

    let techHtml = "";
    proj.tech.forEach((t) => {
      techHtml += "<span>" + escapeHtml(t) + "</span>";
    });

    let linksHtml =
      '<a href="' +
      escapeAttr(proj.github) +
      '" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline"><i class="fab fa-github"></i> Code</a>';
    if (proj.demo) {
      linksHtml +=
        '<a href="' +
        escapeAttr(proj.demo) +
        '" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary"><i class="fas fa-external-link-alt"></i> Demo</a>';
    }

    card.innerHTML =
      "<h3>" +
      escapeHtml(proj.title) +
      '</h3><p class="project-desc">' +
      escapeHtml(proj.description) +
      '</p><div class="project-tech">' +
      techHtml +
      '</div><div class="project-links">' +
      linksHtml +
      "</div>";

    grid.appendChild(card);
  });


  // Footer
  $("#footer-copy").textContent =
    "\u00A9 " + new Date().getFullYear() + " " + profileConfig.name + ". All rights reserved.";

  const footerSocials = $("#footer-socials");
  const footerLinks = [
    { icon: "fab fa-github", text: "GitHub", href: profileConfig.github },
    { icon: "fas fa-envelope", text: "Email", href: "mailto:" + profileConfig.email },
    { icon: "fab fa-linkedin", text: "LinkedIn", href: profileConfig.linkedin },
  ];
  footerLinks.forEach((l) => {
    const a = document.createElement("a");
    a.className = "footer-btn";
    a.href = l.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = '<i class="' + escapeAttr(l.icon) + '"></i> ' + escapeHtml(l.text);
    footerSocials.appendChild(a);
  });
}

/* ========== TYPING EFFECT ========== */
function initTypingEffect() {
  const el = $("#typing-text");
  const phrases = profileConfig.taglines;
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    el.textContent = current.substring(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }

  tick();
}

/* ========== THEME TOGGLE ========== */
function initTheme() {
  const btn = $("#theme-toggle");
  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  btn.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.innerHTML =
      next === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  });

  // Sync icon on load
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    btn.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

/* ========== HAMBURGER MENU ========== */
function initHamburger() {
  const btn = $("#hamburger");
  const menu = $("#nav-menu");

  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    menu.classList.toggle("open");
  });

  // Close menu on link click
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      btn.classList.remove("active");
      menu.classList.remove("open");
    });
  });
}

/* ========== STICKY NAV SHADOW ========== */
function initNavScroll() {
  const nav = $("#navbar");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ========== ACTIVE NAV LINK ========== */
function initActiveLink() {
  const sections = $$("section[id]");
  const links = $$(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(
            '.nav-link[href="#' + entry.target.id + '"]'
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ========== SCROLL REVEAL ========== */
function initReveal() {
  const reveals = $$(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}



/* ========== UTILITIES ========== */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ========== INIT ========== */
document.addEventListener("DOMContentLoaded", () => {
  renderPage();
  initTypingEffect();
  initTheme();
  initHamburger();
  initNavScroll();
  initActiveLink();
  initReveal();
});
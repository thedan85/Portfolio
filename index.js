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
  initials: "HTD",                          // CHANGE: monogram shown in navbar
  taglines: [                              // CHANGE: rotating tagline phrases
    "Backend Developer",
  ],
  intro:
    "I am a software engineering student at Sai Gon University, specializing in backend development. I have a strong foundation in Java and C#, and I am passionate about building scalable and efficient web applications. I am eager to apply my skills in real-world projects and contribute to innovative solutions.",  // CHANGE: short intro paragraph

  // ---- About Section ----
  about: [
    "I am a software engineering student at Sai Gon University, specializing in backend development. I have a strong foundation in Java and C#, and I am passionate about building scalable and efficient web applications. I am eager to apply my skills in real-world projects and contribute to innovative solutions.",
  ],  // CHANGE: about paragraphs (array of strings)

  education: [
    { degree: "Software Engineer", school: "Sai Gon University", year: "2023 – 2028" },
  ],  // CHANGE: education entries

  techStack: [
      "Java", "C#", ".NET", "MySQL", "Git",
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
    title: "InteractHub Social Network Platform",
    description:
      "A full-stack social network platform built with a React and TypeScript frontend and an ASP.NET Core Web API backend backed by MySQL. It includes authentication, posts, comments, likes, shares, profiles, friends, stories, notifications, hashtag search, admin tools, and real-time updates.",
    tech: ["C#", ".NET", "React", "TypeScript", "MySQL", "SignalR"],
    github: "https://github.com/thedan85/Cs-SocialNetworkPlatform",
  },
  {
    title: "Bus Tracking System",
    description:
      "A web application that allows users to track the real-time location of buses, view routes, and receive notifications about bus arrivals and delays. The system includes a backend API built with Java and Spring Boot, a MySQL database for storing bus and route information, and a frontend interface developed using Next.js.",
    tech: ["Java", "MySQL","Spring Boot","Spring Security","Next.js"],
    github: "https://github.com/qwqntp/SSB",
  },
  {
    title: "FunnyMart",
    description:
      "A PHP and MySQL supermarket management system with a role-based dashboard, inventory workflows, sales documents, reporting, and staff management. It uses a layered architecture with controllers, services, repositories, models, and view pages for authentication, permissions, product management, invoices, payroll, and reports.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/qwqntp/web2",
  }
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
  $("#nav-logo").textContent = profileConfig.initials;

  // Nav contact links
  const navContact = $("#nav-contact");
  const navLinks = [
    { text: "GitHub", href: profileConfig.github },
    { text: "LinkedIn", href: profileConfig.linkedin },
  ];
  navLinks.forEach((l) => {
    const a = document.createElement("a");
    a.className = "nav-contact-link";
    a.href = l.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = l.text;
    navContact.appendChild(a);
  });

  // Hero
  $("#hero-name").textContent = profileConfig.name;
  $("#hero-role").textContent = profileConfig.taglines[0];
  $("#hero-intro").textContent = profileConfig.intro;
  $("#hero-stack").textContent = profileConfig.techStack.join(" · ");
  $("#hero-school").textContent =
    profileConfig.education[0].school + " · " + profileConfig.education[0].year;
  $("#hero-email").href = "mailto:" + profileConfig.email;

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
  projects.forEach((proj, i) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    let techHtml = "";
    proj.tech.forEach((t) => {
      techHtml += "<span>" + escapeHtml(t) + "</span>";
    });

    let linksHtml = "";
    if (proj.github) {
      linksHtml +=
        '<a href="' +
        escapeAttr(proj.github) +
        '" target="_blank" rel="noopener noreferrer">Code <span aria-hidden="true">&#8599;</span></a>';
    }
    if (proj.demo) {
      linksHtml +=
        '<a href="' +
        escapeAttr(proj.demo) +
        '" target="_blank" rel="noopener noreferrer">Live <span aria-hidden="true">&#8599;</span></a>';
    }

    card.innerHTML =
      '<span class="project-index" aria-hidden="true">' +
      String(i + 1).padStart(2, "0") +
      "</span>" +
      '<div class="project-body"><div class="project-head"><h3>' +
      escapeHtml(proj.title) +
      "</h3>" +
      (linksHtml ? '<div class="project-links">' + linksHtml + "</div>" : "") +
      '</div><p class="project-desc">' +
      escapeHtml(proj.description) +
      '</p><div class="project-tech">' +
      techHtml +
      "</div></div>";

    grid.appendChild(card);
  });


  // Footer
  $("#footer-copy").textContent =
    "\u00A9 " + new Date().getFullYear() + " " + profileConfig.name;

  const footerSocials = $("#footer-socials");
  const footerLinks = [
    { text: "GitHub", href: profileConfig.github },
    { text: "LinkedIn", href: profileConfig.linkedin },
    { text: "Email", href: "mailto:" + profileConfig.email },
  ];
  footerLinks.forEach((l) => {
    const a = document.createElement("a");
    a.href = l.href;
    if (l.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.innerHTML = escapeHtml(l.text) + ' <span aria-hidden="true">&#8599;</span>';
    footerSocials.appendChild(a);
  });
}

/* ========== THEME TOGGLE ========== */
function initTheme() {
  const btn = $("#theme-toggle");
  const root = document.documentElement;

  function sync() {
    const dark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  sync();

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sync();
  });
}

/* ========== HAMBURGER MENU ========== */
function initHamburger() {
  const btn = $("#hamburger");
  const menu = $("#nav-menu");

  function setOpen(open) {
    btn.classList.toggle("active", open);
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  }

  btn.addEventListener("click", () => {
    setOpen(!menu.classList.contains("open"));
  });

  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      setOpen(false);
      btn.focus();
    }
  });

  window.matchMedia("(min-width: 721px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
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
  initTheme();
  initHamburger();
  initNavScroll();
  initActiveLink();
  initReveal();
});
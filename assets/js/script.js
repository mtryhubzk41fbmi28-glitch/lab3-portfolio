"use strict";

const translations = {
  uk: {
    heroTitle: "Максим",
    heroText: "Я студент КПІ. Люблю рок, джаз і Billie Eilish. Захоплююся фотографією, малюванням та переглядом якісних фільмів і серіалів[cite: 214].",
    projectsLink: "Мої проєкти",
    navHome: "Головна",
    navContacts: "Контакти",
    themeButton: "Тема",
    aboutTitle: "Про мене",
    aboutText: "Мій інтерес зосереджений на поєднанні фотомистецтва з сучасними веб-технологіями та анімацією[cite: 215].",
    projectsTitle: "Проєкти",
    shownLabel: "Показано:",
    allTag: "Усі",
    detailsButton: "Деталі",
    repoLink: "Репозиторій",
    footerText: "Портфоліо студента Максима.",
    footerContacts: "Відкрити контакти",
    contactsTitle: "Контакти",
    contactsText: "Тут зібрані основні способи зв'язку зі мною.",
    contactsListTitle: "Основні контакти",
    backHome: "Повернутися на головну",
    pageTitleIndex: "Портфоліо | Максим [cite: 185]",
    pageTitleContacts: "Контакти | Максим [cite: 336]",
    projects: [
      {
        id: 1,
        title: "Персональні фото",
        description: "Сайт-галерея для вуличних нічних зйомок[cite: 252].",
        details: "Демонстрація моїх робіт, виконаних під час нічних прогулянок містом та оброблених у Lightroom[cite: 298, 299].",
        tags: ["Фото", "Web"]
      },
      {
        id: 2,
        title: "Архітектура",
        description: "Архітектурна зйомка модернізму[cite: 258].",
        details: "Дослідження ліній та форм сучасної архітектури через об'єктив камери[cite: 215].",
        tags: ["Фото", "Мистецтво"]
      },
      {
        id: 3,
        title: "Івенти",
        description: "Атмосферні фото з благодійних івентів[cite: 264].",
        details: "Репортажна зйомка студентських заходів та благодійних ярмарків КПІ[cite: 306, 307].",
        tags: ["Репортаж", "КПІ"]
      }
    ]
  },
  en: {
    heroTitle: "Maksym",
    heroText: "I am a KPI student. I love rock, jazz, and Billie Eilish. I am passionate about photography and high-quality cinema[cite: 214].",
    projectsLink: "My Projects",
    navHome: "Home",
    navContacts: "Contacts",
    themeButton: "Theme",
    aboutTitle: "About Me",
    aboutText: "My interest is focused on combining photographic art with modern web technologies[cite: 215].",
    projectsTitle: "Projects",
    shownLabel: "Shown:",
    allTag: "All",
    detailsButton: "Details",
    repoLink: "Repository",
    footerText: "Maksym's Portfolio.",
    footerContacts: "Open Contacts",
    contactsTitle: "Contacts",
    contactsText: "Here are the main ways to contact me.",
    contactsListTitle: "Main Contacts",
    backHome: "Back to Home",
    pageTitleIndex: "Portfolio | Maksym",
    pageTitleContacts: "Contacts | Maksym",
    projects: [
      {
        id: 1,
        title: "Personal Photos",
        description: "Gallery site for street night photography[cite: 252].",
        details: "Showcasing my works taken during night city walks and processed in Lightroom[cite: 298].",
        tags: ["Photo", "Web"]
      },
      {
        id: 2,
        title: "Architecture",
        description: "Architectural shooting of modernism[cite: 258].",
        details: "Exploring lines and forms of modern architecture through the camera lens.",
        tags: ["Photo", "Art"]
      },
      {
        id: 3,
        title: "Events",
        description: "Atmospheric photos from charity events[cite: 264].",
        details: "Reportage photography of student events and KPI charity fairs[cite: 306].",
        tags: ["Reportage", "KPI"]
      }
    ]
  }
};

let currentLanguage = localStorage.getItem("language") || "uk"; [cite: 147]
let currentTheme = localStorage.getItem("theme") || "light"; [cite: 153]
let selectedTag = "all";
let currentModalProjectId = null;

document.addEventListener("DOMContentLoaded", function () { [cite: 35]
  initTheme();
  initLanguage();
  initProjects();
  initModal();
  initBackToTop();
});

function initTheme() {
  const themeButton = document.getElementById("themeToggle");
  applyTheme();
  if (!themeButton) return;
  themeButton.addEventListener("click", function () { [cite: 62]
    currentTheme = (currentTheme === "light") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme); [cite: 152]
    applyTheme();
  });
}

function applyTheme() {
  if (currentTheme === "dark") {
    document.body.classList.add("dark"); [cite: 53]
  } else {
    document.body.classList.remove("dark");
  }
}

function initLanguage() {
  const buttons = document.querySelectorAll("[data-lang]");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      currentLanguage = button.dataset.lang;
      localStorage.setItem("language", currentLanguage);
      applyLanguage();
      renderTagButtons();
      renderProjects();
      refreshModal();
      updateLanguageButtons();
    });
  });
  applyLanguage();
  updateLanguageButtons();
}

function applyLanguage() {
  const page = document.body.dataset.page;
  const currentTexts = translations[currentLanguage];
  const elements = document.querySelectorAll("[data-i18n]");
  document.documentElement.lang = currentLanguage;
  if (page === "index") document.title = currentTexts.pageTitleIndex;
  if (page === "contacts") document.title = currentTexts.pageTitleContacts;
  elements.forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = currentTexts[key]; [cite: 50]
  });
}

function updateLanguageButtons() {
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLanguage);
  });
}

function initProjects() {
  if (!document.getElementById("projectGrid")) return;
  renderTagButtons();
  renderProjects();
}

function renderTagButtons() {
  const tagList = document.getElementById("tagList");
  if (!tagList) return;
  const projects = translations[currentLanguage].projects;
  const tags = ["all", ...new Set(projects.flatMap(p => p.tags))];
  tagList.innerHTML = "";
  tags.forEach(tag => {
    const button = document.createElement("button");
    button.className = `tag-button ${tag === selectedTag ? 'active' : ''}`;
    button.textContent = tag === "all" ? translations[currentLanguage].allTag : tag;
    button.addEventListener("click", () => {
      selectedTag = tag;
      renderTagButtons();
      renderProjects();
    });
    tagList.appendChild(button);
  });
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const resultCount = document.getElementById("resultCount");
  if (!grid) return;
  const projects = translations[currentLanguage].projects;
  const filtered = selectedTag === "all" ? projects : projects.filter(p => p.tags.includes(selectedTag)); [cite: 98]
  resultCount.textContent = `${filtered.length} / ${projects.length}`;
  grid.innerHTML = "";
  filtered.forEach(project => {
    const article = document.createElement("article");
    article.className = "project-card"; [cite: 112]
    article.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">${project.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}</div>
      <div class="project-actions">
        <button type="button" data-id="${project.id}">${translations[currentLanguage].detailsButton}</button>
      </div>
    `;
    article.querySelector("button").addEventListener("click", () => openModal(project.id));
    grid.appendChild(article); [cite: 116]
  });
}

function initModal() {
  const closeBtn = document.getElementById("modalClose");
  const overlay = document.getElementById("modalOverlay");
  if (!closeBtn) return;
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

function openModal(id) {
  const project = translations[currentLanguage].projects.find(p => p.id === id);
  if (!project) return;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalDetails").textContent = project.details;
  document.getElementById("modalRepo").href = "https://github.com/mtryhubzk41fbmi28-glitch"; [cite: 322]
  document.getElementById("projectModal").classList.add("open");
  currentModalProjectId = id;
}

function closeModal() {
  document.getElementById("projectModal").classList.remove("open");
  currentModalProjectId = null;
}

function refreshModal() {
  if (currentModalProjectId) openModal(currentModalProjectId);
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 300);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
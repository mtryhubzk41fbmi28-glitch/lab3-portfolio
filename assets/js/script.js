"use strict";

const translations = {
  uk: {
    heroTitle: "Максим",
    heroText: "Я студент КПІ. Люблю рок, джаз і Billie Eilish. Захоплююся фотографією, малюванням та переглядом якісних фільмів і серіалів.",
    projectsLink: "Мої проєкти",
    navHome: "Головна",
    navContacts: "Контакти",
    themeButton: "Тема",
    aboutTitle: "Про мене",
    aboutText: "Мій інтерес зосереджений на поєднанні фотомистецтва з сучасними веб-технологіями та анімацією.",
    projectsTitle: "Проєкти",
    shownLabel: "Показано:",
    allTag: "Усі",
    detailsButton: "Деталі",
    repoLink: "Репозиторій",
    footerText: "Портфоліо Максима.",
    footerContacts: "Відкрити контакти",
    contactsTitle: "Контакти",
    contactsText: "Тут зібрані основні способи зв'язку зі мною.",
    contactsListTitle: "Основні контакти",
    backHome: "Повернутися на головну",
    pageTitleIndex: "Портфоліо | Максим",
    pageTitleContacts: "Контакти | Максим",
    projects: [
      {
        id: 1,
        title: "Персональні фото",
        description: "Сайт-галерея для вуличних нічних зйомок.",
        details: "Демонстрація робіт, виконаних під час нічних прогулянок містом та оброблених у Lightroom.",
        image: "image_b8bd9c.png",
        tags: ["Фотографія", "Web"]
      },
      {
        id: 2,
        title: "Архітектура",
        description: "Архітектурна зйомка модернізму.",
        details: "Дослідження ліній та форм сучасної архітектури через об'єктив камери.",
        image: "image_b8bd9c.png",
        tags: ["Фотографія", "Мистецтво"]
      }
    ]
  },
  en: {
    heroTitle: "Maksym",
    heroText: "KPI student. Love rock, jazz, and Billie Eilish. Passionate about photography.",
    projectsLink: "My projects",
    navHome: "Home",
    navContacts: "Contacts",
    themeButton: "Theme",
    aboutTitle: "About me",
    aboutText: "Combining photographic art with modern web technologies.",
    projectsTitle: "Projects",
    shownLabel: "Shown:",
    allTag: "All",
    detailsButton: "Details",
    repoLink: "Repository",
    footerText: "Maksym's Portfolio.",
    footerContacts: "Contacts",
    contactsTitle: "Contacts",
    contactsText: "Ways to contact me.",
    contactsListTitle: "Main contacts",
    backHome: "Back home",
    pageTitleIndex: "Portfolio | Maksym",
    pageTitleContacts: "Contacts | Maksym",
    projects: [
      {
        id: 1,
        title: "Personal Photos",
        description: "Street night photography gallery.",
        details: "Works taken during night city walks.",
        image: "image_b8bd9c.png",
        tags: ["Photography", "Web"]
      },
      {
        id: 2,
        title: "Architecture",
        description: "Modernism architecture.",
        details: "Exploring lines and forms.",
        image: "image_b8bd9c.png",
        tags: ["Photography", "Art"]
      }
    ]
  }
};

let currentLanguage = localStorage.getItem("language") || "uk";
let currentTheme = localStorage.getItem("theme") || "light";
let selectedTag = "all";
let currentModalProjectId = null;

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initLanguage();
  initProjects();
  initModal();
  initBackToTop();
});

function initTheme() {
  const themeButton = document.getElementById("themeToggle");
  if (currentTheme === "dark") document.body.classList.add("dark");
  
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", currentTheme);
    });
  }
}

function initLanguage() {
  const langUk = document.getElementById("langUk");
  const langEn = document.getElementById("langEn");

  const updateUI = () => {
    applyLanguage();
    renderTagButtons();
    renderProjects();
    if (langUk) langUk.classList.toggle("active", currentLanguage === "uk");
    if (langEn) langEn.classList.toggle("active", currentLanguage === "en");
  };

  if (langUk) langUk.addEventListener("click", () => { currentLanguage = "uk"; localStorage.setItem("language", "uk"); updateUI(); });
  if (langEn) langEn.addEventListener("click", () => { currentLanguage = "en"; localStorage.setItem("language", "en"); updateUI(); });

  updateUI();
}

function applyLanguage() {
  const texts = translations[currentLanguage];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (texts[key]) el.textContent = texts[key];
  });
  document.title = document.body.dataset.page === "index" ? texts.pageTitleIndex : texts.pageTitleContacts;
}

function renderTagButtons() {
  const tagList = document.getElementById("tagList");
  if (!tagList) return;
  const projects = translations[currentLanguage].projects;
  const tags = ["all", ...new Set(projects.flatMap(p => p.tags))];
  
  tagList.innerHTML = "";
  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = `tag-button ${tag === selectedTag ? "active" : ""}`;
    btn.textContent = tag === "all" ? translations[currentLanguage].allTag : tag;
    btn.onclick = () => { selectedTag = tag; renderTagButtons(); renderProjects(); };
    tagList.appendChild(btn);
  });
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const projects = translations[currentLanguage].projects;
  const filtered = selectedTag === "all" ? projects : projects.filter(p => p.tags.includes(selectedTag));
  
  grid.innerHTML = "";
  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" style="width:100%; border-radius:8px;">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <button onclick="openModal(${p.id})">${translations[currentLanguage].detailsButton}</button>
    `;
    grid.appendChild(card);
  });
  document.getElementById("resultCount").textContent = filtered.length;
}

function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const close = document.getElementById("modalClose");
  if (overlay) overlay.onclick = closeModal;
  if (close) close.onclick = closeModal;
}

function openModal(id) {
  const p = translations[currentLanguage].projects.find(x => x.id === id);
  if (!p) return;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDetails").textContent = p.details;
  document.getElementById("modalRepo").href = "https://github.com/mtryhubzk41fbmi28-glitch";
  document.getElementById("projectModal").classList.add("open");
}

function closeModal() {
  document.getElementById("projectModal").classList.remove("open");
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.onscroll = () => btn.style.display = window.scrollY > 300 ? "block" : "none";
  btn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
}

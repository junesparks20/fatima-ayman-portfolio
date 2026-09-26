/* =========================
   FATIMA AYMAN PORTFOLIO
   ES6+ JavaScript
   ========================= */

const projects = [
  {
    title: "Early Detection of Wheat Diseases",
    category: "image",
    icon: "bi-image",
    description:
      "Developed a machine learning model for early detection of wheat diseases using image processing techniques. Applied image preprocessing and classification to distinguish healthy and diseased wheat samples.",
    technologies: ["Image Processing", "Machine Learning", "Classification"]
  },
  {
    title: "Fake Product Review Detection",
    category: "ml",
    icon: "bi-shield-check",
    description:
      "Developed a machine learning model to identify fraudulent product reviews and improve trust in online systems. Applied classification techniques to identify suspicious patterns and anomalies.",
    technologies: ["Machine Learning", "Classification", "Data Analysis"]
  }
];

const projectContainer = document.getElementById("projectContainer");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const backToTop = document.getElementById("backToTop");
const year = document.getElementById("year");

/* Objects, arrays, arrow functions and DOM manipulation */
const renderProjects = (projectList) => {
  projectContainer.innerHTML = "";

  projectList.forEach((project) => {
    const card = document.createElement("div");
    card.className = "col-md-6";

    const techList = project.technologies
      .map((tech) => `<span class="badge text-bg-light me-1 mb-1">${tech}</span>`)
      .join("");

    card.innerHTML = `
      <article class="project-card">
        <div class="project-icon">
          <i class="bi ${project.icon}" aria-hidden="true"></i>
        </div>
        <div class="card-body">
          <span class="category">${project.category === "ml" ? "Machine Learning" : "Image Processing"}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div>${techList}</div>
        </div>
      </article>
    `;

    projectContainer.appendChild(card);
  });
};

/* Project filtering */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active", "btn-primary");
      btn.classList.add("btn-outline-primary");
    });

    button.classList.add("active", "btn-primary");
    button.classList.remove("btn-outline-primary");

    const filteredProjects =
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter);

    renderProjects(filteredProjects);
  });
});

/* Theme switching + localStorage */
const updateThemeIcon = () => {
  const dark = document.body.classList.contains("dark-mode");
  themeToggle.innerHTML = `<i class="bi ${dark ? "bi-sun-fill" : "bi-moon-fill"}"></i>`;
  themeToggle.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
};

if (localStorage.getItem("portfolio-theme") === "dark") {
  document.body.classList.add("dark-mode");
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );

  updateThemeIcon();
});

/* Client-side form validation */
const validateForm = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const checks = [
    [name, name.value.trim().length >= 2],
    [email, emailPattern.test(email.value.trim())],
    [subject, subject.value.trim().length >= 3],
    [message, message.value.trim().length >= 10]
  ];

  let valid = true;

  checks.forEach(([field, condition]) => {
    field.classList.toggle("is-invalid", !condition);
    field.classList.toggle("is-valid", condition);

    if (!condition) valid = false;
  });

  return valid;
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    formMessage.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle-fill"></i>
        Please correct the highlighted fields.
      </div>`;
    return;
  }

  formMessage.innerHTML = `
    <div class="alert alert-success" role="alert">
      <i class="bi bi-check-circle-fill"></i>
      Your message has been validated successfully!
    </div>`;

  contactForm.reset();

  document.querySelectorAll(".is-valid").forEach((field) => {
    field.classList.remove("is-valid");
  });
});

/* Real-time error clearing */
contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("is-invalid");
    formMessage.innerHTML = "";
  });
});

/* Back-to-top */
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Current year */
year.textContent = new Date().getFullYear();

/* Close Bootstrap mobile navbar after selecting a section */
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("navbarContent");

    if (menu.classList.contains("show")) {
      const collapse = bootstrap.Collapse.getInstance(menu);
      if (collapse) collapse.hide();
    }
  });
});

/* Initial render */
renderProjects(projects);

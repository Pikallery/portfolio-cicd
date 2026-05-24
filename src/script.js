// ===== DATA =====

function getSkills() {
  return [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'Git & GitHub', level: 85 },
    { name: 'GitHub Actions', level: 75 },
    { name: 'CI/CD Pipelines', level: 70 },
    { name: 'Node.js', level: 65 },
    { name: 'Docker', level: 55 },
  ];
}

function getProjects() {
  return [
    {
      title: 'CI/CD Pipeline Automation',
      description:
        'End-to-end automated pipeline using GitHub Actions. Includes linting, testing, building, and deploying to GitHub Pages on every push.',
      tech: ['GitHub Actions', 'Node.js', 'Jest', 'ESLint', 'GitHub Pages'],
      url: 'https://github.com',
    },
    {
      title: 'Portfolio Website',
      description:
        'Responsive portfolio site built with vanilla HTML, CSS, and JavaScript. Deployed automatically via the CI/CD workflow.',
      tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      url: '#',
    },
    {
      title: 'DevOps Workflow Study',
      description:
        'Research and implementation of DevOps best practices including branching strategies, semantic versioning, and deployment environments.',
      tech: ['Git', 'YAML', 'GitHub Actions', 'Markdown'],
      url: 'https://github.com',
    },
  ];
}

// ===== VALIDATION =====

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateContactForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email address is required';
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

// ===== RENDER =====

function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;
  const skills = getSkills();
  container.innerHTML = skills
    .map(
      (skill) =>
        `<div class="skill-card">
          <div class="skill-name">${skill.name}</div>
          <div class="skill-bar">
            <div class="skill-fill" style="width: ${skill.level}%"></div>
          </div>
          <div class="skill-level">${skill.level}%</div>
        </div>`
    )
    .join('');
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;
  const projects = getProjects();
  container.innerHTML = projects
    .map(
      (project) =>
        `<div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <a href="${project.url}" class="project-link" target="_blank" rel="noopener noreferrer">
            View Project &rarr;
          </a>
        </div>`
    )
    .join('');
}

// ===== FORM =====

function handleContactForm(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  document.querySelectorAll('.error-msg').forEach((el) => el.remove());

  const { valid, errors } = validateContactForm(data);

  if (!valid) {
    Object.keys(errors).forEach((field) => {
      const input = document.getElementById(field);
      const span = document.createElement('span');
      span.className = 'error-msg';
      span.textContent = errors[field];
      input.parentNode.appendChild(span);
    });
    return;
  }

  const form = document.getElementById('contact-form');
  form.innerHTML =
    '<div class="success-msg">&#10003; Message sent! I will get back to you soon.</div>';
}

// ===== THEME =====

function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
  return next;
}

// ===== INIT =====

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderSkills();
    renderProjects();

    const form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', handleContactForm);

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => link.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  });
}

// Export for unit testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getSkills, getProjects, validateEmail, validateContactForm };
}

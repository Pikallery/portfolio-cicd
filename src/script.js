// ===== DATA =====

function getSkills() {
  return [
    {
      name: 'HTML5',
      level: 90,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS3',
      level: 85,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    },
    {
      name: 'JavaScript',
      level: 80,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    },
    {
      name: 'Git',
      level: 85,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    },
    {
      name: 'GitHub',
      level: 80,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    },
    {
      name: 'Node.js',
      level: 65,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Docker',
      level: 55,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    },
    {
      name: 'Linux',
      level: 60,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    },
  ];
}

function getProjects() {
  return [
    {
      title: 'CI/CD Pipeline Automation',
      description:
        'End-to-end automated pipeline using GitHub Actions. Linting, testing, building, and deploying to GitHub Pages on every push to main.',
      tech: ['GitHub Actions', 'Node.js', 'Jest', 'ESLint', 'GitHub Pages'],
      url: 'https://github.com/Pikallery/portfolio-cicd',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      emoji: '⚙️',
    },
    {
      title: 'Portfolio Website',
      description:
        'Responsive portfolio with dark mode, animated typing effect, and scroll-triggered animations. Deployed automatically via the CI/CD workflow.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
      url: 'https://pikallery.github.io/portfolio-cicd/',
      gradient: 'linear-gradient(135deg, #0891b2 0%, #2563eb 100%)',
      emoji: '🌐',
    },
    {
      title: 'DevOps Workflow Study',
      description:
        'Research and implementation of DevOps best practices: branching strategies, semantic versioning, staging vs production environments.',
      tech: ['Git', 'YAML', 'GitHub Actions', 'Markdown'],
      url: 'https://github.com/Pikallery/portfolio-cicd',
      gradient: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
      emoji: '📋',
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
        `<div class="skill-card fade-in">
          <div class="skill-header">
            <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" loading="lazy" />
            <span class="skill-name">${skill.name}</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" data-level="${skill.level}"></div>
          </div>
          <div class="skill-level">${skill.level}%</div>
        </div>`
    )
    .join('');
  animateSkillBars();
}

function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.level + '%';
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );
  fills.forEach((fill) => observer.observe(fill));
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;
  const projects = getProjects();
  container.innerHTML = projects
    .map(
      (project) =>
        `<div class="project-card fade-in">
          <div class="project-banner" style="background: ${project.gradient}">
            <span>${project.emoji}</span>
          </div>
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
              ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <a href="${project.url}" class="project-link" target="_blank" rel="noopener noreferrer">
              View Project &rarr;
            </a>
          </div>
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

// ===== TYPED ANIMATION =====

function initTyped() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = ['DevOps Engineer', 'Web Developer', 'CI/CD Enthusiast', 'GitHub Actions Expert'];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, 45);
      }
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 1800);
      } else {
        setTimeout(tick, 95);
      }
    }
  }
  setTimeout(tick, 600);
}

// ===== SCROLL FADE-IN =====

function initScrollFade() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

// ===== INIT =====

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTyped();
    renderSkills();
    renderProjects();

    // Re-run scroll observer after dynamic content is in the DOM
    initScrollFade();

    const form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', handleContactForm);

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
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

    const navObserver = new IntersectionObserver(
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
    sections.forEach((section) => navObserver.observe(section));
  });
}

// Export for unit testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getSkills, getProjects, validateEmail, validateContactForm };
}

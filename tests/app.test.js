const { getSkills, getProjects, validateEmail, validateContactForm } = require('../src/script');

// ===== getSkills =====

describe('getSkills', () => {
  test('returns a non-empty array', () => {
    const skills = getSkills();
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  test('every skill has a name and numeric level', () => {
    const skills = getSkills();
    skills.forEach((skill) => {
      expect(typeof skill.name).toBe('string');
      expect(skill.name.trim().length).toBeGreaterThan(0);
      expect(typeof skill.level).toBe('number');
    });
  });

  test('all skill levels are between 0 and 100', () => {
    const skills = getSkills();
    skills.forEach((skill) => {
      expect(skill.level).toBeGreaterThanOrEqual(0);
      expect(skill.level).toBeLessThanOrEqual(100);
    });
  });
});

// ===== getProjects =====

describe('getProjects', () => {
  test('returns a non-empty array', () => {
    const projects = getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  test('every project has the required fields', () => {
    const projects = getProjects();
    projects.forEach((project) => {
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.tech)).toBe(true);
      expect(project.tech.length).toBeGreaterThan(0);
      expect(typeof project.url).toBe('string');
    });
  });

  test('project titles are non-empty strings', () => {
    const projects = getProjects();
    projects.forEach((project) => {
      expect(project.title.trim().length).toBeGreaterThan(0);
    });
  });
});

// ===== validateEmail =====

describe('validateEmail', () => {
  test('accepts valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('name.surname@domain.org')).toBe(true);
    expect(validateEmail('test+tag@sub.domain.co')).toBe(true);
  });

  test('rejects invalid email addresses', () => {
    expect(validateEmail('notanemail')).toBe(false);
    expect(validateEmail('missing@nodot')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });

  test('handles non-string inputs safely', () => {
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(123)).toBe(false);
  });
});

// ===== validateContactForm =====

describe('validateContactForm', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, this is a valid test message.',
  };

  test('passes with valid data', () => {
    const result = validateContactForm(validData);
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  test('fails when all fields are empty', () => {
    const result = validateContactForm({});
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('name');
    expect(result.errors).toHaveProperty('email');
    expect(result.errors).toHaveProperty('message');
  });

  test('fails when name is too short', () => {
    const result = validateContactForm({ ...validData, name: 'J' });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('name');
    expect(result.errors.name).toMatch(/2 characters/);
  });

  test('fails when email is invalid', () => {
    const result = validateContactForm({ ...validData, email: 'bad-email' });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('email');
  });

  test('fails when message is too short', () => {
    const result = validateContactForm({ ...validData, message: 'Hi' });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('message');
    expect(result.errors.message).toMatch(/10 characters/);
  });

  test('only reports errors for invalid fields', () => {
    const result = validateContactForm({ ...validData, name: 'X' });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('name');
    expect(result.errors).not.toHaveProperty('email');
    expect(result.errors).not.toHaveProperty('message');
  });

  test('returns correct structure', () => {
    const result = validateContactForm(validData);
    expect(result).toHaveProperty('valid');
    expect(result).toHaveProperty('errors');
    expect(typeof result.valid).toBe('boolean');
    expect(typeof result.errors).toBe('object');
  });
});

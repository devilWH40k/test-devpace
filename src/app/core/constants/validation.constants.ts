export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/
} as const;

export const FORM_WEIGHTS = {
  FULL_NAME: 20,
  CONTACT: 30,
  SPECIALIZATION: 25,
  SKILLS: 25
} as const;

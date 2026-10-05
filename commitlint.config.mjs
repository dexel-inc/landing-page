// Conventional Commits para los repositorios del Taller de Dexel.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-case': [0],
  },
};

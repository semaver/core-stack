export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Dependabot and changelog commit bodies embed long compare/release URLs;
    // the header (type/scope/subject) is what we actually enforce.
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};

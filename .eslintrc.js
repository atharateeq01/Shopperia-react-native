/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json', // or path to your tsconfig.json
      },
    },
  },
};

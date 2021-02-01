module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // No Windows é utilizado o CLRF e no linux somente o LF, ignoramos no windows
    'linebreak-style': 0,

    // Podemos chamar o metodo sem usar o this
    'class-methods-use-this': 'off',

    // Pode receber parametros e alterar eles
    'no-param-reassign': 'off',

    // Desabilita o camelcase, tem momentos que precisamos usar o _
    camelcase: 'off',

    // Reclama de variáveis não utilizadas, somente o next não vai reclamar
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],

    // Retorna erro pelo eslint quando uma linha for muito grande
    'prettier/prettier': 'error',

    'no-console': 1,
  },
};

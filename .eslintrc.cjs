module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 0, //'error', // 禁止使用 console
    'no-unused-vars': 0, //'error', // 禁止定义未使用的变量
    'no-debugger': 0, //'error', // 禁止使用 debugger
    'no-var': 0, // 要求使用 let 或 const 而不是 var
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-constant-condition': 0,
    '@typescript-eslint/no-namespace': 0
  }
}

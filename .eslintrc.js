module.exports = {
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'script'
  },
  globals: {
    // Add any global variables if needed
  },
  rules: {
    // Allow console.log in development
    'no-console': 'off',
    // Ensure proper spacing
    'space-before-function-paren': ['error', 'always']
  },
  ignorePatterns: [
    '*.d.ts',
    'node_modules/',
    'coverage/'
  ]
}

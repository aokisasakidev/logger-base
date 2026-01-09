#!/usr/bin/env node

/**
 * Security validation script for debug-fmt
 * Performs additional security checks beyond npm audit and snyk
 */

const fs = require('fs')
const path = require('path')

const REQUIRED_FILES = [
  'SECURITY.md',
  'CODE_OF_CONDUCT.md',
  'CONTRIBUTING.md',
  'LICENSE.md'
]

const SECURITY_PATTERNS = [
  // Patterns that should not be in production code
  { pattern: /console\.log\(/g, file: 'src/**/*.js', warning: 'Console.log statements found' },
  { pattern: /debugger;?/g, file: 'src/**/*.js', error: 'Debugger statements found' },
  { pattern: /TODO|FIXME|HACK/gi, file: 'src/**/*.js', warning: 'TODO/FIXME/HACK comments found' }
]

let hasErrors = false
let hasWarnings = false

console.log('🔒 Running security validation checks...\n')

// Check for required security files
console.log('📋 Checking required security files...')
REQUIRED_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`)
  } else {
    console.log(`❌ ${file} is missing`)
    hasErrors = true
  }
})

// Check package.json for security configurations
console.log('\n📦 Checking package.json security configurations...')
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  // Check for security scripts
  const securityScripts = ['security:audit', 'security:check', 'prepare']
  securityScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ Security script '${script}' configured`)
    } else {
      console.log(`⚠️  Security script '${script}' missing`)
      hasWarnings = true
    }
  })

  // Check for engines specification
  if (packageJson.engines && packageJson.engines.node) {
    console.log(`✅ Node.js version constraint: ${packageJson.engines.node}`)
  } else {
    console.log('⚠️  No Node.js version constraint specified')
    hasWarnings = true
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message)
  hasErrors = true
}

// Check source code for security patterns
console.log('\n🔍 Scanning source code for security issues...')
try {
  const srcFiles = fs.readdirSync('src').filter(file => file.endsWith('.js'))

  srcFiles.forEach(file => {
    const filePath = path.join('src', file)
    const content = fs.readFileSync(filePath, 'utf8')

    SECURITY_PATTERNS.forEach(({ pattern, error, warning }) => {
      const matches = content.match(pattern)
      if (matches) {
        const message = error || warning
        const level = error ? '❌' : '⚠️ '
        console.log(`${level} ${filePath}: ${message} (${matches.length} occurrences)`)

        if (error) hasErrors = true
        if (warning) hasWarnings = true
      }
    })
  })

  if (!hasErrors && !hasWarnings) {
    console.log('✅ No security issues found in source code')
  }
} catch (error) {
  console.log('⚠️  Could not scan source files:', error.message)
  hasWarnings = true
}

// Check for .gitignore security
console.log('\n🔐 Checking .gitignore for sensitive files...')
try {
  const gitignore = fs.readFileSync('.gitignore', 'utf8')
  const sensitivePatterns = [
    'node_modules',
    '*.log',
    '.env',
    '.DS_Store'
  ]

  sensitivePatterns.forEach(pattern => {
    if (gitignore.includes(pattern)) {
      console.log(`✅ ${pattern} is ignored`)
    } else {
      console.log(`⚠️  ${pattern} should be in .gitignore`)
      hasWarnings = true
    }
  })
} catch (error) {
  console.log('⚠️  Could not read .gitignore:', error.message)
  hasWarnings = true
}

// Summary
console.log('\n📊 Security Validation Summary:')
if (hasErrors) {
  console.log('❌ Security validation failed with errors')
  process.exit(1)
} else if (hasWarnings) {
  console.log('⚠️  Security validation completed with warnings')
  console.log('💡 Consider addressing the warnings above')
  process.exit(0)
} else {
  console.log('✅ All security validation checks passed!')
  process.exit(0)
}

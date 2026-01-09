'use strict'

// Enable debug output programmatically if not set via environment
// On Windows: This allows the test to run without setting DEBUG env var
// On Unix/Linux: You can still use DEBUG=* node test.js
if (!process.env.DEBUG) {
  process.env.DEBUG = '*'
}

const debugFmt = require('./src/index.js')

console.log('=== Basic Usage ===\n')

// Basic usage with default options
const debug = debugFmt('test:basic')

debug('Basic log message')
debug('Message with data', { userId: 123, action: 'login' })
debug.info('Info level message', { status: 'ok' })
debug.warn('Warning message', { code: 404 })
debug.error('Error message', { error: 'Something went wrong' })

console.log('\n=== Custom Levels ===\n')

// Custom log levels
const debugCustom = debugFmt('test:custom', {
  levels: ['info', 'warn', 'error', 'fatal', 'trace']
})

// debugCustom('Default level message')
debugCustom.info('Info message')
// debugCustom.warn('Warning message')
// debugCustom.error('Error message')
// debugCustom.fatal('Fatal error message')
// debugCustom.trace('Trace message')

console.log('\n=== Duration Measurement ===\n')

// Duration measurement
const debugDuration = debugFmt('test:duration')

const duration = debugDuration.duration('database query')
// Simulate async operation
setTimeout(() => {
  duration.info('Query completed', { rows: 100 })
}, 100)

const errorDuration = debugDuration.duration('api call')
setTimeout(() => {
  errorDuration.error('API call failed', { status: 500 })
}, 200)

console.log('\n=== Custom Encoding ===\n')

// Custom encoding function
const debugCustomEncode = debugFmt('test:encode', {
  encode: (obj) => {
    // Custom JSON-like encoding
    return Object.entries(obj)
      .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
      .join(' | ')
  }
})

debugCustomEncode('Custom encoded message', {
  userId: 123,
  name: 'John Doe',
  active: true
})

console.log('\n=== Disable Colors ===\n')

// Disable colors
const debugNoColors = debugFmt('test:nocolors', {
  colors: false
})

debugNoColors('Message without colors', { data: 'test' })
debugNoColors.info('Info without colors')

console.log('\n=== Custom Duration Format ===\n')

// Custom duration format
const debugCustomDuration = debugFmt('test:duration-format', {
  durationFormat: (ms) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`
    return `${(ms / 60000).toFixed(2)}m`
  }
})

const customDuration = debugCustomDuration.duration('operation')
setTimeout(() => {
  customDuration('Operation completed')
}, 1500)

console.log('\n=== Custom Prefix ===\n')

// Custom prefix function
const debugCustomPrefix = debugFmt('test:prefix', {
  prefix: (namespace, color) => {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${namespace}] `
  }
})

debugCustomPrefix('Message with custom prefix', { event: 'user_action' })

console.log('\n=== Combined Options ===\n')

// Combine multiple options
const debugCombined = debugFmt('test:combined', {
  levels: ['info', 'warn', 'error'],
  colors: false,
  prefix: (namespace) => `[${namespace.toUpperCase()}] `,
  durationFormat: (ms) => `${ms}ms`,
  encode: (obj) => {
    return Object.keys(obj)
      .map(key => `${key}="${String(obj[key])}"`)
      .join(' ')
  }
})

debugCombined('Combined options test', { userId: 456, action: 'logout' })
debugCombined.info('Info with combined options', { status: 'success' })

const combinedDuration = debugCombined.duration('combined operation')
setTimeout(() => {
  combinedDuration.info('Combined duration test')
}, 50)

console.log('\n=== Real-world Examples ===\n')

// Example 1: API request logging
const apiDebug = debugFmt('api', {
  levels: ['info', 'warn', 'error']
})

const apiRequest = apiDebug.duration('GET /api/users')
setTimeout(() => {
  apiRequest.info('Request completed', {
    status: 200,
    method: 'GET',
    path: '/api/users',
    userId: 789
  })
}, 300)

// Example 2: Database operation
const dbDebug = debugFmt('db', {
  colors: false,
  prefix: (namespace) => '[DB] '
})

const dbQuery = dbDebug.duration('SELECT users')
setTimeout(() => {
  dbQuery('Query executed', {
    table: 'users',
    rows: 42,
    queryTime: '45ms'
  })
}, 250)

// Example 3: Error logging with custom format
const errorDebug = debugFmt('app:error', {
  encode: (obj) => {
    if (obj.error) {
      return `error="${obj.error.message}" stack="${obj.error.stack && obj.error.stack.substring(0, 100)}"`
    }
    return Object.entries(obj)
      .map(([k, v]) => `${k}=${v}`)
      .join(' ')
  }
})

errorDebug.error('Application error', {
  error: new Error('Test error'),
  context: 'user authentication',
  userId: 999
})

// Wait for async operations to complete
setTimeout(() => {
  console.log('\n=== Test Complete ===')
  console.log('\nNote: Debug output is enabled by default in this test file.')
  console.log('To filter output, set DEBUG environment variable:')
  console.log('  Windows (cmd): set DEBUG=test* && node test.js')
  console.log('  Windows (PowerShell): $env:DEBUG="test*"; node test.js')
  console.log('  Windows (batch): test.bat test*')
  console.log('  Unix/Linux/Mac: DEBUG=test* node test.js')
  console.log('\nExamples:')
  console.log('  - DEBUG=test:basic* (only basic usage)')
  console.log('  - DEBUG=api* (only API examples)')
  console.log('  - DEBUG=* (all output)')
  console.log('\nOr use the batch file: test.bat [filter]')
}, 500)

# debug-fmt

<div align="center">
	<img width="800" src="https://i.imgur.com/R0cd2Gj.png" >
</div>

## Highlights

- Based on the popular [`debug`](https://www.npmjs.com/package/debug) module.
- Lazy level evaluation used logs levels.
- Level support: `info`, `warn` & `error` based from [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424).
- Message formatting Heroku [logfmt](https://brandur.org/logfmt) syntax.
- Colorized output via [`DEBUG_COLORS`](https://github.com/debug-js/debug#environment-variables) by default.
- [`debug.duration`](#measurement) for measurement.

## Install

```bash
$ npm install debug-fmt --save
```

## Usage

### Multiple levels

Given a code like this one:

```js
const debug = require('debug-fmt')('metascraper')

debug('retry', { url: 'https://kikobeats.com' })
debug.info('done', { time: Date.now() })
debug.warn('token expired', { timestamp: Date.now() })
debug.error('whoops', { message: 'expected `number`, got `NaN`' })
```

You can:
- Allow all the levels: `DEBUG=debug-fmt*`
- Discard specific levels: `DEBUG="*,-metascraper:info*" node example.js`

### Measurement

Sometimes you need to log the duration of a function:

```js
const { setTimeout } = require('timers/promises')

const debug = require('debug-fmt')('metascraper')

const duration = debug.duration()

setTimeout(1001).then(() => duration.error('timeout!'))
setTimeout(1100).then(() => duration.info('success'))
```

### Custom Options

You can customize the logger behavior with options:

```js
const debug = require('debug-fmt')('myapp', {
  // Custom log levels
  levels: ['info', 'warn', 'error', 'fatal'],
  
  // Disable colors
  colors: false,
  
  // Custom duration format
  durationFormat: (ms) => `${Math.round(ms)}ms`,
  
  // Custom prefix
  prefix: (namespace) => `[${namespace}] `,
  
  // Custom encoding (e.g., for structured logging)
  encode: (obj) => JSON.stringify(obj)
})
```

#### Using Custom Encoding

```js
const debug = require('debug-fmt')('myapp', {
  encode: (obj) => {
    // Convert object to your preferred format
    return Object.entries(obj)
      .map(([key, value]) => `${key}="${String(value)}"`)
      .join(' ')
  }
})

debug('user action', { userId: 123, action: 'login' })
// Output: user action userId="123" action="login"
```

#### Custom Duration Format

```js
const debug = require('debug-fmt')('myapp', {
  durationFormat: (ms) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`
    return `${(ms / 60000).toFixed(2)}m`
  }
})

const duration = debug.duration('operation')
// After 1500ms: duration=1.50s
```

## API

### debug(env, [options])

#### env

*Required*<br>
Type: `string`

The env variable name to use for enabling logging using `DEBUG`.

#### options

Type: `object`<br>
Default: `{}`

Configuration options for the debug logger.

##### levels

Type: `array`<br>
Default: `['info', 'warn', 'error']`

The log levels available. Each level will be accessible as a method on the debug instance (e.g., `debug.info()`, `debug.warn()`, `debug.error()`).

##### encode

Type: `function`<br>
Default: The default logfmt encoder

Custom encoding function for converting objects to logfmt format. The function receives an object and should return a logfmt-formatted string.

```js
const debug = require('debug-fmt')('myapp', {
  encode: (obj) => {
    // Custom encoding logic
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join(' ')
  }
})
```

##### colors

Type: `boolean`<br>
Default: `true` (unless `DEBUG_COLORS=false` in environment)

Enable or disable colored output. When disabled, log messages will not include ANSI color codes.

```js
const debug = require('debug-fmt')('myapp', {
  colors: false
})
```

##### durationFormat

Type: `function`<br>
Default: `pretty-ms` formatter

Custom format function for duration formatting. The function receives a number (milliseconds) and should return a formatted string.

```js
const debug = require('debug-fmt')('myapp', {
  durationFormat: (ms) => {
    return `${ms}ms`
  }
})
```

##### prefix

Type: `function`<br>
Default: The default prefix formatter

Custom prefix function for formatting log messages. The function receives the namespace (string) and color code (number), and should return a formatted prefix string.

```js
const debug = require('debug-fmt')('myapp', {
  prefix: (namespace, color) => {
    return `[${namespace}] `
  }
})
```

### debug.duration([...args])

It returns a function will print the duration in the next call.

```js
const duration = debug.duration('query')
const result = await db.query(query)
duration(result)
```

## License

**debug-fmt** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/debug-fmt/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/debug-fmt/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · X [@Kikobeats](https://x.com/Kikobeats)

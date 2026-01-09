declare namespace DebugLogfmt {
  /**
   * Options for configuring the debug logger
   */
  interface DebugOptions {
    /**
     * Custom log levels available.
     * @default ['info', 'warn', 'error']
     */
    levels?: string[]

    /**
     * Custom encoding function for converting objects to logfmt format.
     * @default The default logfmt encoder
     */
    encode?: (obj: Record<string, any>) => string

    /**
     * Enable or disable colored output.
     * @default true (unless DEBUG_COLORS=false in environment)
     */
    colors?: boolean

    /**
     * Custom format function for duration formatting.
     * @default pretty-ms formatter
     */
    durationFormat?: (ms: number) => string

    /**
     * Custom prefix function for formatting log messages.
     * @param namespace - The debug namespace
     * @param color - The color code for this namespace
     * @returns The formatted prefix string
     */
    prefix?: (namespace: string, color: number) => string
  }

  interface DurationLogger {
    (...args: any[]): boolean
    error(...args: any[]): boolean
    info(...args: any[]): boolean
  }

  interface DebugLogger {
    (...args: any[]): void
    duration(...args: any[]): DurationLogger
    [level: string]: ((...args: any[]) => void) | DurationLogger | ((...args: any[]) => DurationLogger)
  }
}

declare function createDebugLogger(env: string, options?: DebugLogfmt.DebugOptions): DebugLogfmt.DebugLogger

export = createDebugLogger

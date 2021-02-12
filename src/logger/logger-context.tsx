import React, { createContext, useContext, useState } from "react";
import { isMatch } from "matcher";
import { swallow } from "../@funcd";

export type ILogger = {
  trace(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
};

export enum LoggerLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF,
}

export type ILoggerContext = {
  getLogger: (namespace: string) => ILogger;
};
export const LoggerContext = createContext<ILoggerContext>({
  getLogger: () => ({
    trace: swallow,
    debug: swallow,
    info: swallow,
    warn: console.warn,
    error: console.error,
  }),
});

/**
 * Logger provider to Wrap around an application and expose logs from flying-dice components
 *
 * @param level {LoggerLevel} Which Log Level to use
 * @param logger {ILogger} Which Logger to use, i.e. Console
 * @param namespace {string} Which namespace to match i.e. MyApp:*
 */
export const LoggerProvider: React.FC<{
  logger?: ILogger;
  level?: LoggerLevel;
  namespace: string;
}> = ({ level: propLevel, logger: propLogger, namespace, children }) => {
  const [logger] = useState<ILogger | undefined>(propLogger);
  const [level] = useState<LoggerLevel>(propLevel || LoggerLevel.DEBUG);
  const [ns] = useState<string>(namespace || "*");

  const trace = (namespace: string) => (...args: any[]) => {
    logger &&
      level <= LoggerLevel.DEBUG &&
      isMatch(namespace, ns) &&
      logger?.debug({ namespace, level: "trace" }, ...args);
  };

  const debug = (namespace: string) => (...args: any[]) => {
    logger &&
      level <= LoggerLevel.DEBUG &&
      isMatch(namespace, ns) &&
      logger?.debug({ namespace, level: "debug" }, ...args);
  };

  const info = (namespace: string) => (...args: any[]) => {
    logger &&
      level <= LoggerLevel.INFO &&
      isMatch(namespace, ns) &&
      logger?.info({ namespace, level: "info" }, ...args);
  };

  const warn = (namespace: string) => (...args: any[]) => {
    logger &&
      level <= LoggerLevel.WARN &&
      isMatch(namespace, ns) &&
      logger?.warn({ namespace, level: "warn" }, ...args);
  };

  const error = (namespace: string) => (...args: any[]) => {
    logger &&
      level <= LoggerLevel.ERROR &&
      isMatch(namespace, ns) &&
      logger?.error({ namespace, level: "error" }, ...args);
  };

  return (
    <LoggerContext.Provider
      value={{
        getLogger: (ns) => ({
          trace: trace(ns),
          debug: debug(ns),
          info: info(ns),
          warn: warn(ns),
          error: error(ns),
        }),
      }}
    >
      {children}
    </LoggerContext.Provider>
  );
};

/**
 * Hook to create a logger HOF which wraps a namespace
 *
 * @example
 * ```jsx
 *  import React from "react"
 *  import { useLogger } from "@flying-dice/fluentui-toolkit"
 *
 *  export const MyComponent = () => {
 *   const { debug, info } = useLogger("MyApp:MyComponent");
 *   ...
 *
 *   useEffect(() => {
 *     debug("Hello World!");
 *   }, [])
 * }
 *  ```
 *
 * @param namespace {string} The Namespace to bind the logger to
 *
 * @returns {ILogger} Returns the Logger HOF which includes the namespace being called from
 */
export const useLogger = (namespace: string): ILogger => {
  const { getLogger } = useContext<ILoggerContext>(LoggerContext);

  return getLogger(namespace);
};

# Flying Dice Logger

The FluentUI Toolkit provides a logger to use in React Projects.

It's a simple logger that takes care of tweaking levels and hiding the API.

It also cannot be hijacked by renaming local store items or changing window references.

If you do not supply a `LoggerProvider` the components still use the default context which is
console logging all `warnings` and `errors`. Trace -> Info is swallowed

## Example

### Installing

```tsx
import React from "react";
import { LoggerLevel, LoggerProvider } from "@flying-dice/fluentui-toolkit";

const MyApp = () => {
  return (
    <LoggerProvider logger={console} level={LoggerLevel.DEBUG} namespace={"MyApp:*"}>
      ...
    </LoggerProvider>
  );
};

export default App;
```

### Usage

```jsx
import React from "react"
import { useLogger } from "@flying-dice/fluentui-toolkit"

export const MyComponent = () => {
  const { debug, info } = useLogger("MyApp:MyComponent");
  ...
}
```

## Options

### Delegate log level to logger

To delegate the log level federation to the logger i.e. winston transport simply omit the
log level prop from the provider

```jsx
import React from "react";
import { LoggerLevel, LoggerProvider } from "@flying-dice/fluentui-toolkit";

const MyApp = () => {
  return (
    <LoggerProvider logger={console} namespace={"MyApp:*"}>
      ...
    </LoggerProvider>
  );
};

export default App;
```

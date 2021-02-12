# Flying Dice - FluentUI Toolkit

Additional Components and helpers to extend FluentUI

## Installation

```shell
yarn add @flying-dice/fluentui-toolkit
```

## Development

To Develop the Project in tandem with another use the yarn link feature.

Run `yarn link` within this project, then run `yarn link "@flying-dice/fluentui-toolkit"` 
within the dependant project to use the local build rather than NPM.

ℹ Issues can occour with React Versions such as `Error: Invalid hook call` 
To resolve this Link `react` and `react-dom` also.

```shell
// This Project
cd node_modules/react
yarn link
cd ../../node_modules/react-dom
yarn link

// Dependant Project
yarn link react
yarn link react-dom
```

## Usage

See the Storybook for component Documentation

https://flying-dice.github.io/fluentui-toolkit/

## License

[MIT](https://choosealicense.com/licenses/mit/)
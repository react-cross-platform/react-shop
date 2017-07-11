# Shop example for mobile web. [Demo](http://shop.serga.name/)

CAUTION: This code is for fun. Now it isn't stable, isn't production ready and sometimes is ugly

## Motivation

* try [modern tech stack](https://github.com/grab/front-end-guide)
* share code between platforms as much as possible
* use great tooling (IDE , Debuggers, DevTools, linters, code formatters)
* front-end - JS on any platform (React), common back-end. GraphQL - to bind both

## Long term idea

Cross-platform front-end for

* web and mobile web ([React](https://facebook.github.io/react/))
* mobile apps ([React Native](https://facebook.github.io/react-native/))
* desktop apps ([React + Electron](https://electron.atom.io/))

with shared common code using

* [ReactXP](https://github.com/Microsoft/reactxp)
* or [Lerna](https://github.com/lerna/lerna)

Smells like future front-end!

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/-5VkI0dpHek/0.jpg)](https://www.youtube.com/watch?v=-5VkI0dpHek)

## Current tech stack (mobile web)

### Front-end

* [TypeScript](https://www.typescriptlang.org/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/) to manage app's state
* [Apollo Client](http://dev.apollodata.com/) to manage data from GraphQL API
* [Webpack 3](https://webpack.js.org/) with [React Hot Loader](http://gaearon.github.io/react-hot-loader/)
* [CSS-Modules](https://github.com/css-modules/css-modules)
* [Ant Design Mobile](https://mobile.ant.design/) for UI

### Back-end

* [GraphQL](http://graphql.org/) server using [Python Graphene](http://graphene-python.org/)

## How to install

1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/)
1. Clone git project and `cd` to it
1. Copy `.env.default` file to `.env` with command `cp .env.default .env`. This will be your local settings
1. Install packages by running `yarn install`
1. Start project with `yarn start`
1. Open in Chrome [http://localhost:3000/](http://localhost:3000/), inspect window (from menu `View -> Developer -> Developer Tools`) and enable [mobile device simulator](https://developers.google.com/web/tools/chrome-devtools/device-mode/) in DevTools

## Architecture

### One React component - one directory

```bash

/MyComponent
  /MyComponent.tsx
  /myQuery.gql  # GraphQL query. Named like "GraphQl root query field". Can be multiple per directory
  /styles.css  # local-scoped styles with CSS-Modules
  /myIcon.svg  # some media. Can be multiple per directory
  /readme.md  # component-related docs
```

## Tools

### GraphiQL

An in-browser IDE for exploring GraphQL API. Try [this query](http://shop.serga.name/graphiql?query=query%20%7B%0A%20%20allProducts(categoryId%3A62%2C%20first%3A2%2C%20offset%3A0)%20%7B%0A%20%20%20%20total%0A%20%20%20%20products%20%7B%0A%20%20%20%20%20%20category%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20brand%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20images%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20src%0A%20%20%20%20%20%20%20%20isTitle%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%09attributes%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20values%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%20%20%20%20%20%20%0A%20%20%20%20%20%20subProducts%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20article%0A%20%20%20%20%20%20%20%20attributes%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20values%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=) (when opened press `Prettify` and play button)

### React DevTools

1. In Chrome install [React DevTools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
1. After that, you will have "React" tab in Debug Toolbar

### Redux DevTools

1. In Chrome install [Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
1. After that, you will have "Redux" tab in Debug Toolbar

### Apollo DevTools

1. In Chrome install [Apollo DevTools extension](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)
1. After that, you will have "Apollo" tab in Debug Toolbar

## [Visual Studio Code IDE](https://code.visualstudio.com/) (optional)

### Why

* subjectively handles this stack better (even than WebStorm)
* you can fully and quickly configure it with steps below

### If you DON'T use it - automatically install all extensions and configure it

1. Install [VSCode](https://code.visualstudio.com/) and open project's directory via menu `File -> Open...`
1. Install extension [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
    * in menu select `View -> Extensions` to open extensions sidebar
    * type *Settings Sync* and install it
1. Download extensions and keybindings
    * in menu select `View -> Command Palette` and run command "*Sync : Download Settings*". After this step all happens automatically and your VSCode will be ready for work
* NOTE: If you don't need keybindings like *IntelliJ IDEA* uninstall this [extension](https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings)

### Already use it

* to prevent rewriting your own settings - you can try it with [VSCode Insiders](https://code.visualstudio.com/insiders)
* or just look at [list](https://gist.githubusercontent.com/ArtemSerga/1df9939592444399135c22d3a10b46f4/raw/d6132345dc4cb2855149a38948f1f171bf75db20/extensions.json) of recommended extensions
* or do nothing, mandatory extensions are mentioned below

## [TypeScript](https://www.typescriptlang.org/)

* before webpack building, TS => JS compilation happens automatically, so you don't need to run it manually
* *VSCode*
  * to watch and conveniently solve TS errors via PROBLEMS section (in menu `View -> Problems`) select in menu `View -> Command Palette...` and type command "*Tasks: Run Build Task*"

## Linters and code formatters

### [Tslint](https://palantir.github.io/tslint/) to lint TS

* to run manually for all project via terminal `yarn run tslint`
* *VSCode*
  * install [TsLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) extension
  * for opened files it automatically show errors in PROBLEMS section (in menu `View -> Problems`)
  * to see all project problems select in menu `Go -> Go to File...` and type *task tslint*

### [Prettier](https://prettier.io/) code formatter

* TSLint for linting, Prettier for code formatting
* in this project all TypeScript, JS, CSS, GraphQL and JSON files are formatted using Prettier
* *VSCode*
  * install [Prettier - JavaScript formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension
  * to format file select in menu `View -> Command Palette...` and type command "*Format Document*"

### [Stylelint](https://stylelint.io/) to lint CSS

* *Stylelint* for linting, *Prettier* for code formatting
* to run manually for all project select in menu `Go -> Go to File...` and type "*task stylelint*"
* *VSCode*
  * install [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) extension
  * for opened files it automatically shows errors in PROBLEMS section (select in menu `View -> Problems`)
  * for code formatting use *Prettier* described above

### JSON formatter

* Also use *Prettier* described above

### [MarkDown](https://en.wikipedia.org/wiki/Markdown) linter and tools

* every React component has own directory, so it's a good place to describe it with `readme.md`
* *VSCode*
  * side-by-side preview with extension [Auto-Open Markdown Preview](https://marketplace.visualstudio.com/items?itemName=hnw.vscode-auto-open-markdown-preview)
  * linting with extension [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) to solve problems via menu `View -> Problems`

## UI with [Ant Design](https://ant.design/) and [Ant Design Mobile](https://mobile.ant.design/)

* based on React, written in TypeScript
* dozens of features
* subjectively one of the most mature UI library
* cross-platform support:
  * [Ant Design](https://ant.design/) for web + desktop apps (supports [Electron](https://electron.atom.io/))
  * [Ant Design Mobile](https://mobile.ant.design/) for mobile web + mobile apps (supports [React Native](https://facebook.github.io/react-native/))
* intensively developed by Alibaba
  * Chinese? Don't panic! It almost translated in English
  * the team is great and responsive

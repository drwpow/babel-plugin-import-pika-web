# Import Pika Web

A Babel plugin for transforming imports on files to ESM imports for
[@pika/web][pika-web].

```js
import preact from 'preact'; // Transforms this 🚫
import preact from './web_modules/preact.js'; // Into this ✅
```

## Installation

```bash
npm i -D @babel/core babel-plugin-import-pika-web
```

## Usage

Add the following to `.babelrc`:

```json
{
  "plugins": [
    [
      "import-pika-web",
      {
        "dir": "dist/web_modules",
        "ignore": ["jest"]
      }
    ]
  ]
}
```

This plugin will resolve all paths to a module relative to the web modules
folder set. Also, according to the ES spec, it will also add a `.js`
extension to any extension-less imports.

### Options

| Name     | Default         | Description                                                                                                                                       |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dir`    | `"web_modules"` | Location of the web modules. Should usually match the `--dest` option for @pika/web.                                                              |
| `ignore` | `[]`            | Exact names of modules to ignore, if you find it transforming things it shouldn’t (e.g. `"react"` will match `"react"` but ignore `"react-dom"`). |

### Using Babel CLI

Install the Babel CLI

```
npm i -D @babel/cli
```

And add the following to `package.json`:

```json
{
  "scripts": {
    "build": "npm run build:esm && npm run build:js",
    "build:esm": "pika-web --dest dist/web_modules",
    "build:js": "babel dist -d dist --ignore web_modules/*.js"
  },
  "@pika/web": {
    "webDependencies": ["preact", "preact-router"]
  }
}
```

Combine this with the `.babelrc` above, and run:

```bash
npm run build
```

### Using webpack

No, silly! This _replaces_ webpack! It lets the browser handle code-splitting
and optimizations! [Read this blog post][pika-web-blog] to learn more.

## Examples

[TypeScript + @pika/web][pika-web-preact]

[pika-web]: https://github.com/pikapkg/web/
[pika-web-blog]: https://www.pikapkg.com/blog/pika-web-a-future-without-webpack/
[pika-web-preact]: https://github.com/dangodev/pika-web-preact

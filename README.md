# JavaScript 30 Boilerplate

A gulp ITCSS Sass based boilerplate for the [Javascript 30](https://javascript30.com) course projects.

Compiles Sass files and automatically adds vendor prefixes.
Exports minified CSS files with header info.
Generates SVG sprites.

[Download JavaScript 30 Boilerplate](https://github.com/neutraltone/javascript-30-boilerplate/archive/master.zip)

## Contents

* [Getting Started](#getting-started)
* [License](#license)

## Getting Started

### Dependencies

Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
  * `npm start` automatically watch for changes and compile files, lints JavaScript and server and synchronise changes to the browser via [Browsersync](https://www.browsersync.io/) accordingly;
  * `npm run lint:sass` lints your sass using [stylelint](https://github.com/stylelint/stylelint). Rules can be found in the [`.stylelint`](https://github.com/neutraltone/gulp-boilerplate/blob/master/.stylelintrc) config file.   
  * `npm run build` manually compile files and lint JavaScript without serving the files to the browser.
  * `npm run build:sass` manually compiles just your sass.
  * `npm run build:images` manually optimizes just your images.
  * `npm run build:svg-sprite` manually compiles all your SVG's in a SVG sprite.

## License

The code is available under the [MIT License](https://github.com/neutraltone/gulp-boilerplate/blob/master/LICENSE.md).  

# eleventy-parcel-boilerplate
> Starter kit for using [Eleventy] with [webpack], backed by [Forestry].

[Eleventy] is <cite>_a simpler static site generator_</cite>, which does a beautiful job of scaffolding your static site. However, a web application is so much more; what about images, stylesheets, or scripts? This is where [webpack], a <cite>_static module bundler_</cite>, comes in. By combining [Eleventy] with [webpack], you can take your static site to the next level with minimal effort.

As a bonus, this project is preconfigured to work out of the box with [Forestry], in case you use [Forestry] to edit your site content.

## Installation
**Recommended**

This project is set-up as a [Template Repository][1]. Click the "Use this template" button to create your new static site from this repository.

**Others**

1. Clone the repository using `git clone https://github.com/vseventer/eleventy-webpack-boilerplate`.
2. Navigate to your project directory using `cd eleventy-webpack-boilerplate`.
3. Install the dependencies using `npm install`.

_This project supports both `npm` and `yarn`, feel free to use whichever package manager you're most comfortable with._

## Getting Started
Please familiarize yourself with [Eleventy] and [webpack], and you will recognize the source directory contains all you need to get started with your new static site.

## Development
* To start the development server, run `npm start` or `npm run watch` and navigate to `http://localhost:8080`.
* To build your site just once (for production), run `npm run build`.

_The development server, [webpack-dev-server], is provided by [webpack] and set-up to work in sync with [Eleventy]._

## Configuration
This project predefines a set of configuration files, which can be tweaked depending on your preferences.

### `package.json`
The `browserslist` property reflects the browsers your static website supports, per [browserslist].

The `config` block in `package.json` enumerates three directories:
* `input`: the source of your web application.
* `intermediate`: the output directory for [Eleventy], and input directory for [webpack]. You should never directly modify contents in this directory.
* `output`: the final build of your web application.

### `.babelrc`
The [Babel] smart preset is used allowing you to use the latest JavaScript. Two separate plugins supporting (private) class methods and properties are added by default as well.

### `.eslintrc` and `src/.eslintrc`
This project follows [Airbnb] configuration for [ESLint]. The source directory extends the base configuration, and makes sure you can use certain environment variables in your JavaScript, as [supported][2] by [webpack].

Linting is ran on your configuration files, as well as the scripts in the source directory of your static site.

### `.stylelintrc`
This project follows the recommended configuration for [stylelint]. Linting is ran as part of [PostCSS] as explained below.

### `eleventy.config.js`
The [Eleventy] configuration file sets some sane defaults, as well as provide a boilerplate for how to add custom filters and tags. This project comes with one sample `link` custom Nunjucks tag.

### `postcss.config.js`
The [PostCSS] configuration adds a number of plugins. Your stylesheets are linted with [stylelint], processed with [postcss-preset-env] (which includes [autoprefixer]) before being optimized with [PurgeCSS] (production only).

### `webpack.config.babel.js`
The [webpack] configuration defines how your assets are bundled together.

## Content Management
Content of your site lives in the `src/` directory by default.

If you are using [Forestry] to manage your content, import your site by following the steps in the [Forestry] Dashboard. This project is set-up so that the [Instant Preview][3] functionality of Forestry will work out of the box.

## Alternatives
* [eleventy-parcel-boilerplate]: Alternative using [Parcel] over [webpack].

## License
    The MIT License (MIT)

    Copyright (c) 2020 Mark van Seventer

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[eleventy]: https://www.11ty.io/
[airbnb]: https://github.com/airbnb/javascript
[autoprefixer]: https://github.com/postcss/autoprefixer
[babel]: https://babeljs.io/
[browserslist]: https://github.com/browserslist/browserslist
[eleventy-parcel-boilerplate]: https://github.com/vseventer/eleventy-parcel-boilerplate
[eslint]: https://eslint.org/
[forestry]: https://forestry.io/
[parcel]: https://parceljs.org/
[postcss]: https://postcss.org/
[postcss-preset-env]: https://github.com/csstools/postcss-preset-env
[purgecss]: https://www.purgecss.com/
[stylelint]: https://stylelint.io/
[webpack]: https://webpack.js.org/
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server/
[1]: https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template
[2]: https://webpack.js.org/plugins/environment-plugin/
[3]: https://forestry.io/docs/previews/instant-previews/

// @see https://github.com/postcss/postcss-loader#configuration

// Standard lib.
import { join as joinPath } from 'path';

// Package modules.
import cssnano from 'cssnano';
import presetEnv from 'postcss-preset-env';
import purgecss from '@fullhuman/postcss-purgecss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';

// Local modules.
import { config } from './package.json';

// Constants.
const INPUT_DIRECTORY = config.input;
// const INTERMEDIATE_DIRECTORY = config.intermediate;
// const OUTPUT_DIRECTORY = config.output;
const PRODUCTION = process.env.NODE_ENV === 'production';

// @see https://www.11ty.io/docs/languages/
const ELEVENTY_TEMPLATE_LANGUAGES = [
  'html', 'md', '11ty.js', 'liquid', 'njk', 'hbs', 'mustache', 'ejs', 'haml', 'pug', 'jstl'
];

// Helpers.
const isTruthy = (x) => !!x;

// Exports.
module.exports = {
  plugins: [
    stylelint(),
    presetEnv({ preserve: !PRODUCTION }),
    PRODUCTION && purgecss({
      // Purge using full output (more precise, but slow).
      // content: [joinPath(INTERMEDIATE_DIRECTORY, '**/*.html')],
      // Purge using templates (fast, but lots of false negatives).
      content: [joinPath(INPUT_DIRECTORY, `**/*.{${ELEVENTY_TEMPLATE_LANGUAGES}}`)],
      // Allow colons in selectors.
      defaultExtractor: (content) => content.match(/[\w-:]+/g) || [],
      fontFace: true,
      keyframes: true,
      variables: true
    }),
    PRODUCTION && cssnano(),
    reporter({ clearReportedMessages: true })
  ].filter(isTruthy)
};

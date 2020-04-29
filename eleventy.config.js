// @see https://www.11ty.io/docs/config/

// Standard lib.
import {
  join as joinPath,
  relative as relativePath
} from 'path';
import { inspect } from 'util';

// Package modules.
import markdownIt from 'markdown-it';

// Local modules.
import { config } from './package.json';
import NunjucksEvalExtension from './lib/nunjucks/tags/eval';
import NunjucksLinkExtension from './lib/nunjucks/tags/link';

// Constants.
const INPUT_DIRECTORY = config.input;
// const INTERMEDIATE_DIRECTORY = config.intermediate;
// const OUTPUT_DIRECTORY = config.output;

// Configure.
// @see https://github.com/markdown-it/markdown-it#init-with-presets-and-options
const markdownRenderer = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

// Exports.
module.exports = (eleventyConfig) => {
  // Customize Front Matter parsing.
  // @see https://www.11ty.io/docs/data-frontmatter-customize/
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->'
  });

  // Customize Markdown parsing.
  // @see https://www.11ty.dev/docs/languages/markdown/
  eleventyConfig.addFilter('markdown', (value) => markdownRenderer.render(`${value}`));
  eleventyConfig.setLibrary('md', markdownRenderer);

  // Add universal filters.
  // @see https://www.11ty.dev/docs/filters/
  eleventyConfig.addFilter('debug', inspect);

  // Add custom tags.
  // @see https://www.11ty.io/docs/shortcodes/
  eleventyConfig.addNunjucksTag('eval', NunjucksEvalExtension.singleton);
  eleventyConfig.addNunjucksTag('link', NunjucksLinkExtension.singleton);

  // Copy static assets.
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '*.txt'));

  // Return configuration options.
  // @see https://www.11ty.io/docs/config/
  return {
    // @see https://www.11ty.io/docs/config/#input-directory
    dir: {
      layouts: relativePath(INPUT_DIRECTORY, joinPath(INPUT_DIRECTORY, '_layouts/'))
    },

    // @see https://www.11ty.io/docs/config/#default-template-engine-for-markdown-files
    markdownTemplateEngine: 'njk'
  };
};

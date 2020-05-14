// Standard lib.
import { resolve as resolvePath } from 'path';

// Package modules.
import globby from 'globby';
import imageminMozjpeg from 'imagemin-mozjpeg';
import ImageminPlugin from 'imagemin-webpack-plugin';
import { parseQuery } from 'loader-utils';
import sharp from 'responsive-loader/sharp';
import { EnvironmentPlugin } from 'webpack';

// Local modules.
import { config } from './package.json';

// Constants.
const INPUT_DIRECTORY = resolvePath(__dirname, config.input);
const INTERMEDIATE_DIRECTORY = resolvePath(__dirname, config.intermediate);
const NODE_MODULES_DIRECTORY = resolvePath(__dirname, 'node_modules/');
const OUTPUT_DIRECTORY = resolvePath(__dirname, config.output);
const PRODUCTION = process.env.NODE_ENV === 'production';
const STAGING = process.env.NODE_ENV === 'staging';

// Helpers.
const generateName = (defaultName) => (
  (resourcePath, resourceQuery) => {
    const { name } = parseQuery(resourceQuery || '?');
    return name || defaultName;
  }
);

// Exports.
module.exports = {
  // Dynamic entry with all files in intermediate.
  context: INPUT_DIRECTORY,
  entry: () => globby('*', {
    absolute: true,
    baseNameMatch: true,
    cwd: INTERMEDIATE_DIRECTORY,
    onlyFiles: true
  }),

  mode: 'development',
  output: {
    path: OUTPUT_DIRECTORY,
    publicPath: '/',
    filename: 'scripts/runtime.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: INTERMEDIATE_DIRECTORY,
              name: generateName('[path][name].[ext]')
            }
          },
          'extract-loader',
          'html-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: generateName(
                PRODUCTION ? '[path][name].[contenthash:8].[ext]' : '[path][name].[ext]'
              )
            }
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: { esModule: true, import: false, sourceMap: !PRODUCTION }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !PRODUCTION }
          }
        ]
      },
      {
        test: /\.js$/i,
        exclude: NODE_MODULES_DIRECTORY,
        issuer: /\.html$/i,
        use: {
          loader: 'spawn-loader',
          options: {
            name: generateName(
              PRODUCTION ? '[path][name].[contenthash:8].[ext]' : '[path][name].[ext]'
            )
          }
        }
      },
      {
        test: /\.js$/i,
        exclude: NODE_MODULES_DIRECTORY,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(heic|jpe?g|png|tiff|webp)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: sharp,
            name: PRODUCTION ? '[path][name].[contenthash:8].[ext]' : '[path][name].[ext]',
            quality: 100
          }
        }
      },
      {
        test: /\.(eot|gif|otf|svg|ttf|woff2?)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: generateName(
              PRODUCTION ? '[path][name].[contenthash:8].[ext]' : '[path][name].[ext]'
            )
          }
        }
      },
      {
        test: /\.txt$/i,
        use: {
          loader: 'file-loader',
          options: {
            context: INTERMEDIATE_DIRECTORY,
            name: generateName('[path][name].[ext]')
          }
        }
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({ WEBPACK_DEV_SERVER: false }),
    new ImageminPlugin({
      disable: !PRODUCTION,
      gifsicle: { optimizationLevel: 3 },
      jpegtran: null, // Disabled because we're using mozjpeg.
      optipng: null, // Disabled because we're using pngquant.
      plugins: [
        imageminMozjpeg({ quality: 80, progressive: true })
      ],
      pngquant: { speed: 1, strip: true },
      test: '**/*.{gif,jpeg,jpg,png,svg}'
    })
  ],
  resolve: {
    modules: [INPUT_DIRECTORY, NODE_MODULES_DIRECTORY]
  },
  devServer: {
    ...STAGING && { host: '0.0.0.0' }
  }
};

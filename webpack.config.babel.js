// Standard lib.
import { resolve as resolvePath } from 'path';
import { parse as parseQueryString } from 'querystring';

// Package modules.
import globby from 'globby';
import { EnvironmentPlugin } from 'webpack';

// Local modules.
import { config } from './package.json';

// Constants.
const INPUT_DIRECTORY = resolvePath(__dirname, config.input);
const INTERMEDIATE_DIRECTORY = resolvePath(__dirname, config.intermediate);
const OUTPUT_DIRECTORY = resolvePath(__dirname, config.output);
const PRODUCTION = process.env.NODE_ENV === 'production';
const STAGING = process.env.NODE_ENV === 'staging';

// Helpers.
const generateName = (defaultName) => (
  (_, query = '?') => {
    const { name } = parseQueryString(query.substr(1));
    return name || defaultName;
  }
);

// Exports.
module.exports = {
  // Dynamic entry with all files in intermediate.
  context: INTERMEDIATE_DIRECTORY,
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
    filename: 'scripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: generateName('[path][name].[ext]') }
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
                PRODUCTION ? 'styles/[name].[contenthash:8].css' : 'styles/[name].css'
              )
            }
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: { esModule: true, sourceMap: !PRODUCTION }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !PRODUCTION }
          }
        ]
      },
      {
        test: /\.js$/i,
        exclude: resolvePath(__dirname, 'node_modules'),
        use: [
          {
            loader: 'spawn-loader',
            options: {
              name: generateName(
                PRODUCTION ? 'scripts/[name].[contenthash:8].js' : 'scripts/[name].js'
              )
            }
          },
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(gif|jpe?g|svg|png|webm)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: generateName(
              PRODUCTION ? 'images/[name].[contenthash:8].[ext]' : 'images/[name].[ext]'
            )
          }
        }
      },
      {
        test: /\.(eot|otf|ttf|woff2?)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: generateName(
              PRODUCTION ? 'fonts/[name].[contenthash:8].[ext]' : 'fonts/[name].[ext]'
            )
          }
        }
      },
      {
        test: /\.txt$/i,
        use: {
          loader: 'file-loader',
          options: { name: generateName('[path][name].[ext]') }
        }
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({ WEBPACK_DEV_SERVER: false })
  ],
  resolve: {
    alias: { src: INPUT_DIRECTORY }
  },
  devServer: {
    ...STAGING && { host: '0.0.0.0' }
  }
};

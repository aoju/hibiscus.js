/**
 * Webpack Plugins
 *
 */
const AssetsPlugin = require('assets-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const HtmlElementsPlugin = require('./plugin.html');
const buildUtils = require('./build.utils');
/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {

  /**
   * Webpack Constants
   */
  const METADATA = Object.assign({}, buildUtils.options.metadata, options.metadata || {});

  buildUtils.chalk(METADATA);

  const entry = {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
    vendor: './src/vendor.ts',
    jquery: ['jquery'],
    jquery: ['echarts'],
    common: ['nprogress', 'date-fns', 'screenfull', 'perfect-scrollbar']
  };

  return {

    /**
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /**
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: entry,

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', 'json'],

      /**
       * An array of directory names to be resolved to the current directory
       */
      modules: [buildUtils.options.path.src, buildUtils.options.path.node_modules]

    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [

        /**
         * Typescript loader support for .ts
         *
         * Component Template/Style integration using `@angular-devkit/build-optimizer`
         * Angular 2 lazy loading (async routes) via `ng-router-loader`
         *
         * `@ngtools/webpack` expects vanilla JavaScript code, not TypeScript code. This is why the
         * order of the loader matter.
         *
         * See: https://github.com/angular/devkit
         * See: https://github.com/angular/angular-cli
         */
        {
          test: /\.ts$/,
          use: [
            {
              /**
               *  MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
               */
              loader: 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
                aot: METADATA.AOT
              }
            },
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: buildUtils.options.path.tsconfig
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /**
         * To string and css loader support for *.css files (from Angular components)
         * Returns file content as string
         *
         */
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [buildUtils.root('src', 'assets/styles/css')]
        },

        /**
         * To string and sass loader support for *.scss files (from Angular components)
         * Returns compiled css content as string
         *
         */
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [buildUtils.root('src', 'assets/styles/scss')]
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [buildUtils.root('src/index.html')]
        },

        /**
         * File loader for supporting images, in CSS files.
         */
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'file-loader'
        },

        /**
         * url loader for supporting fonts, in CSS files.
         */
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: '[hash:8].[ext]',
            publicPath: '../../',
            outputPath: 'assets/fonts/'
          }
        }
      ]

    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      /**
       * Plugin: AssetsPlugin
       * Description: This plug-in outputs a json file with the paths of the
       * generated assets so you can find them from somewhere else.
       *
       * See: https://github.com/kossnocorp/assets-webpack-plugin
       */
      new AssetsPlugin({
        path: buildUtils.root('dist'),
        filename: 'assets.json',
        prettyPrint: true
      }),

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'AOT': METADATA.AOT,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR
        }
      }),

      /**
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       */
      /*
       new CommonsChunkPlugin({
         name: ['manifest'],
         minChunks: Infinity,
       }),*/

       new CommonsChunkPlugin({
         name: 'widget',
         chunks: ['main'],
         minChunks: (module) => module.resource && module.resource.startsWith(buildUtils.root('node_modules'))
       }),

      /**
       * Specify the correct order the scripts will be injected in
       */
      new CommonsChunkPlugin({
        name: ['inline', 'polyfills', 'vendor', 'jquery', 'common', 'echarts', 'widget'].reverse()
      }),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        /**
         * The (\\|\/) piece accounts for path separators in *nix and Windows
         */
        /(.+)?angular(\\|\/)core(.+)?/,
        buildUtils.root('src'),
        {
          /**
           * Your Angular Async Route paths relative to this root directory
           */
        }
      ),

      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
          from: 'src/assets',
          to: 'assets',
        }], {
          ignore: [
            // Doesn't copy any files with a txt extension
            //'*.css',
            // Doesn't copy any file, even if they start with a dot
            //'**/*',
            'styles/**/*',
            'fonts/*'
            // Doesn't copy any file, except if they start with a dot
            //{ glob: '**/*', dot: false }
          ],
          // By default, we only copy modified files during
          // a watch or webpack-dev-server build. Setting this
          // to `true` copies all files.
          copyUnmodified: true
        },
        METADATA.isProd ? {ignore: ['styles/**/*']} : undefined
      ),

      /*
       * Plugin: PreloadWebpackPlugin
       * Description: Preload is a web standard aimed at improving
       * performance and granular loading of resources.
       *
       * See: https://github.com/GoogleChrome/preload-webpack-plugin

      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        //include: 'asyncChunks'
        include: ['polyfills', 'vendor', 'main'].reverse(),
        fileBlacklist: ['.css', '.map']
      }),*/

      /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: 'src/index.html',
        inject: 'head',
        favicon: 'src/assets/img/logo.png',
        minify: METADATA.isProd ? {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        } : false,
        hash: true,
        showErrors: true,
        metadata: METADATA
      }),

      /**
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      /*
       new ScriptExtHtmlWebpackPlugin({
         sync: /polyfills|vendor/,
         defaultAttribute: 'async',
         preload: [/polyfills|vendor|main/],
         prefetch: [/chunk/]
       }),
       */

      /**
       * Plugin: ProvidePlugin
       * Description: Automatically load modules instead of having to import or require them everywhere.
       * Whenever the `identifier` is encountered as free variable in a module, the `module` is loaded automatically and the `identifier` is filled with the
       * exports of the loaded `module` (of `property` in order to support named exports).
       *
       * new webpack.ProvidePlugin({
               identifier: 'module1', // or
               identifier: ['module1', 'property1'],
            })
       */
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),

      /**
       * Plugin: HtmlElementsPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('./build.head')
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({}),

      /**
       * Plugin: InlineManifestWebpackPlugin
       * Inline Webpack's manifest.js in index.html
       *
       * https://github.com/szrenwei/inline-manifest-webpack-plugin
       */
      new InlineManifestWebpackPlugin(),
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  }

}

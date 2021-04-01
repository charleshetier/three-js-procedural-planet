// @ts-check
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {knownPaths} = require('./core');

/**
 * The webpack configuration creation factory
 * @param {*} env The environement variables
 * @param {*} argv The command line description
 */
module.exports = (env, argv) => {

    // Creation of the webpack configuration
    return /** @type { import('webpack').Configuration } */ {
        entry: Path.join(knownPaths.client.root, 'index.ts'),
        output: {
            path: knownPaths.dist
        },

        // The build mode
        mode: env.production ? 'production' : 'development',

        // The way source maps are created
        devtool: env.production ? undefined : 'inline-source-map',

        // Dev server for development mode only
        devServer: env.production ? undefined : {
            contentBase: knownPaths.dist,
            hot: true,
            writeToDisk: true
          },

        // Modules definition
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.client.json'
                        }
                    },
                    exclude: /node_modules/,
                },

                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      "style-loader",
                      // Translates CSS into CommonJS
                      "css-loader",
                      // Compiles Sass to CSS
                      "sass-loader",
                    ],
                  },
            ],
        },

        // Plugins definition
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Three js application',
                template: Path.join(knownPaths.client.root, 'index.html')
            })     // adds an index.html file with a reference to the bundle file
        ],

        // Included file extensions
        resolve: {
            extensions: ['.ts', '.js'],
        }
    }
};
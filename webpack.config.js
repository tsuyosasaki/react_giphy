const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({ filename: '[name].css', allChunks: true });

const publidDir = path.join(__dirname, '/public');
module.exports = [
  {
    mode: 'development',
    entry: './src/index.jsx',
    // entry: [
    //   './src/index.jsx',
    // ],
    output: {
      path: publidDir,
      // publicPath: '/',
      filename: 'bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'es2015'],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publidDir,
    },
  },
  {
    mode: 'development',
    entry: {
      style: './stylesheets/index.scss',
    },
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.css',
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          // include: fs.realpathSync('./vendor'),
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  outputStyle: 'expanded',
                  sourceComments: true,
                  indentWidth: 2,
                },
              },
            ],
          }),
        },

        // {
        //   test: /\.css$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        //     },
        //   ],
        // },
        // {
        //   test: /\.scss$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
        //     },
        //   ],
        // },
      ],
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
    ],
  },
];

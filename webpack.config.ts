import * as webpack from 'webpack'
import * as path from 'path'
// ts-ignore
const webpackNodeExternals = require('webpack-node-externals')

// TODO: ikke generer d.ts-filer for interne typer i ./dist/ (så
// de ikke dukker opp i den publiserte npm-pakken.

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    library: {
      name: ['ExampleComponent'],
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  externalsPresets: { node: true },
  externals: [webpackNodeExternals()]
}

export default config

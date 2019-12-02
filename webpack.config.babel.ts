import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const getMode = (env?: string) => {
  switch (env) {
    case 'development':
    case 'production':
      return env;
    default:
      return 'none';
  }
};

const config: webpack.Configuration = {
  mode: getMode(process.env.NODE_ENV),
  target: 'node',
  output: { libraryTarget: 'commonjs2' },
  resolve: {
    alias: { lodash: 'lodash-es' },
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [{ test: /\.ts$/, use: ['babel-loader', 'ts-loader'] }],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: { chunks: 'all' },
    minimizer: [new TerserPlugin()],
  },
};

export default config;

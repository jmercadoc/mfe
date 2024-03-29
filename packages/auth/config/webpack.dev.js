const { merge } = require('webpack-merge'); 
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commontConfig = require('./webpack.common');
const packgeJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'http://localhost:8082/',
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
          name: 'auth',
          filename: 'remoteEntry.js',
          exposes: {
            './AuthApp': './src/bootstrap',
          },
        shared: packgeJson.dependencies,
        }),
    ]
};

module.exports = merge(commontConfig, devConfig);
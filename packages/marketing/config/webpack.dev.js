const { merge } = require('webpack-merge'); 
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commontConfig = require('./webpack.common');
const packgeJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'http://localhost:8081/',
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
          name: 'marketing',
          filename: 'remoteEntry.js',
          exposes: {
            './MarketingApp': './src/bootstrap',
          },
        shared: packgeJson.dependencies,
        }),
    ]
};

module.exports = merge(commontConfig, devConfig);
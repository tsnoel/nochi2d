const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    includePaths: [`${__dirname}/src/styles`]
                }
            }
        }
    },
    publicPath: './',
    outputDir: path.resolve(__dirname, 'docs'),
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.compilerOptions = {
                    ...(options.compilerOptions || {}),
                    isCustomElement: tag => /ion-\w*/.test(tag)
                };
                return options;
            });
    },
    configureWebpack: {
        devServer: {
            hot: false,
            liveReload: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        },
        output: {
            chunkFilename: '[name].js?id=[chunkhash]',
            filename: '[name].js?id=[hash]',
            globalObject: 'window'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            modules: [
                resolve('src'),
                resolve('node_modules')
            ],
            alias: {
                assets: path.resolve(__dirname, 'src/assets'),
                img: path.resolve(__dirname, 'src/assets/img'),
                components: path.resolve(__dirname, 'src/components'),
                scenes: path.resolve(__dirname, 'src/scenes'),
                helpers: path.resolve(__dirname, 'src/helpers'),
                models: path.resolve(__dirname, 'src/models'),
                styles: path.resolve(__dirname, 'src/styles')
            }
        }
    }
};

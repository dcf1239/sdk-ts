
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const path = require('path');
const paths = require('react-scripts/config/paths');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const appBuildPathFile = () => config => {
    if (config.mode === 'development') {
        console.log('evn is development, skip build path change...')
    } else if (config.mode === 'production') {
        console.log('evn is production, change build path...')
        // 关闭sourceMap
        config.devtool = false
        //  // 配置打包后的文件位置修改path目录
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
        config.output.path = path.join(path.dirname(config.output.path), 'dist')
        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js(\?.*)?$|\.css$/,
                threshold: 1024
            }),
            new MiniCssExtractPlugin({
                chunkFilename: 'static/css/[name].css',
            })
        )

        // 更改生产模式输出的文件名
        config.output.filename = 'static/js/[name].js'
        config.output.chunkFilename = 'static/js/[name].js'
        config.output.path = __dirname + '/dist'
            //
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        }
    }
    return config
}


module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@text-color': 'rgba(0, 0, 0, 0.65)',
            '@headerHeight': '60px',
            '@sidebarWidth': '180px'
        },
    }),
    appBuildPathFile(),

);
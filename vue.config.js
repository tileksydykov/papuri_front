const path = require('path');
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8090/',
                ws: true
            },
        }
    },
    chainWebpack: (config) => {
        const types = [
            'vue-modules',
            'vue',
            'normal-modules',
            'normal',
        ];
        types.forEach((type) =>
            addStyleResource(
                config.module.rule('stylus').oneOf(type),
            ),
        );
    },
};

function addStyleResource(rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(
                    __dirname,
                    './src/styles/themes.styl',
                ),
            ],
        });
}

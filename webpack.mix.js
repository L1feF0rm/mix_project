const mix = require('laravel-mix');
const package = require('./package.json');
const {default: InjectBodyWebpackPlugin} = require('inject-body-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();

mix
    .options({legacyNodePolyfills: false})
    .webpackConfig({
        plugins: [
            new InjectBodyWebpackPlugin({content: '<main v-cloak></main><aside x-cloak x-data="aside"></aside>'}),
            new HtmlWebpackPlugin({
                filename: `index.${package.config.php ? 'php' : 'html'}`,
                hash: true,
                template: 'src/html5.ejs',
                templateParameters: {
                    package,
                    node: JSON.stringify({
                        arch: process.arch,
                        platform: process.platform,
                        version: process.version
                    }),
                    php: `<?php echo json_encode([
                        'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'],
                        'REMOTE_PORT' => $_SERVER['REMOTE_PORT'],
                        'SERVER_SOFTWARE' => $_SERVER['SERVER_SOFTWARE']
                    ]) ?>`
                },
                publicPath: '.'
	        }),
	        new CspHtmlWebpackPlugin({
                'default-src': "'self'",
                'script-src': "'unsafe-eval'",
                'script-src-attr': "'none'",
                'style-src': "'none'"
            }),
            new MomentLocalesPlugin({localesToKeep: ['bg']}),
            new MomentTimezoneDataPlugin({
                matchZones: /^Europe/,
                startYear: currentYear - 10,
                endYear: currentYear + 40
            })
	    ],
        resolve: {
            alias: {
                // vue$: 'vue/dist/vue.runtime.esm.js',
                vuex$: 'vuex/dist/vuex.esm.js',
                'vue-router$': 'vue-router/dist/vue-router.esm.js'
            }
        }
    })
    .alias({
        '@': 'src/js',
        '@components': 'src/js/components',
        '@router': 'src/js/router',
        '@store': 'src/js/store'
    })
    .sourceMaps(false)
    .setPublicPath('public')
    .sass('src/sass/index.scss', 'public')
    .js('src/js/index.js', 'public')
    .vue({runtimeOnly: mix.inProduction()})
    .extract()
    .version()
    .disableNotifications()
    .dumpWebpackConfig();
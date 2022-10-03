import Vue from 'vue';
import VueRouter from 'vue-router';
import {App, AsyncView, Counter} from '../components';

Vue.use(VueRouter);

console.info('VueRouter.version', VueRouter.version);

export default new VueRouter({
    routes: [{
        path: '/',
        component: App
    }, {
        path: '/async',
        component: AsyncView
    }, {
        path: '/lazy',
        component() {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(import(
                        /* webpackChunkName: "counter/[request]" */
                        /* webpackMode: "lazy" */
                        '../components/Counter.vue'
                    ));
                }, 4000);
            });
        }
    }, {
        path: '/counter',
        component: Counter
    }, {
        path: '*',
        redirect: '/'
    }]  
});
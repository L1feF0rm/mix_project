import Vue from 'vue';
import VueRouter from 'vue-router';
import {App, AsyncView} from '../components';

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
        path: '/counter',
        component() {
            return import(/* webpackChunkName: "counter" */ '../components/Counter.vue');
        }
    }, {
        path: '*',
        redirect: '/'
    }]  
});
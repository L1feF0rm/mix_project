import Vue from 'vue';
import Alpine from 'alpinejs';
import router from './router';
import store from './store';

export const data = JSON.parse(document.scripts.data.text);

Vue.config.productionTip = false;

console.info('Vue.version', Vue.version);
console.info('Alpine.version', Alpine.version);
console.info('Node.process.arch', data.node.arch);
console.info('Node.process.platform', data.node.platform);
console.info('Node.process.version', data.node.version);
if (data.php) console.info(data.php.SERVER_SOFTWARE);

export const main = new Vue({
    el: 'main',
    name: 'main',
    render(h) {
        return h('main', [h('router-view')]);
    },
    router,
    store
});

window.Alpine = Alpine;

Alpine.data('aside', function () {
    return {
        name: 'aside',
        status: false,
        count: 420
    };
});

Alpine.start();
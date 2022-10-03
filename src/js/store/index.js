import Vue from 'vue';
import Vuex from 'vuex';

const API_JSON = 'https://jsonplaceholder.typicode.com';

Vue.use(Vuex);

console.info('Vuex.version', Vuex.version);

export default new Vuex.Store({
    modules: {
        post: {
            namespaced: true,
            state: {
                user: {},
                post: {},
                users: [],
                posts: []
            },
            actions: {
                async user(store, id) {
                    const response = await fetch(`${API_JSON}/users/${id}`);
                    return store.state.user = await response.json();
                },
                async post(store, id) {
                    const response = await fetch(`${API_JSON}/posts/${id}`);
                    return store.state.post = await response.json();
                },
                async users(store) {
                    const response = await fetch(`${API_JSON}/users`);
                    return store.state.users = await response.json();
                },
                async posts(store, id) {
                    const url = id
                        ? `${API_JSON}/users/${id}/posts`
                        : `${API_JSON}/posts`;
                    const response = await fetch(url);
                    return store.state.posts = await response.json();
                }
            }
        }
    }
});
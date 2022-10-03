export default function handler () {
    return {
        delay: 400,
        loading: {
            functional: true,
            render(h) {
                return h('span', 'loading...');
            }
        },
        component: new Promise(function(resolve) {
            setTimeout(function () {
                resolve({
                    functional: true,
                    render(h) {
                        return h('span', 'component!');
                    }
                });
            }, 4000);
        })
    };
};

export async function AsyncView() {
    return {
        functional: true,
        render(h, {data, children}) {
            return h(handler, data, children);
        }
    };
};
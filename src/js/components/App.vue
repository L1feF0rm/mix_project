<template>
    <section>
        <span>$vnode.tag = {{ $vnode.tag }}</span>
        <hr>
        <async></async>
    </section>
</template>

<script>
    import Async from './Async.js';

    export default {
        components: {
            Async
        }
    };
</script>
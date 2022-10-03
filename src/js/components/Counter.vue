<template>
    <section>
        <button type="button" @click="count++">+</button>
        {{ count }}
        <button type="button" @click="count--">-</button>
    </section>
</template>

<script>
    export default {
        name: 'counter',
        data() {
            return {
                count: 0
            }
        }        
    }
</script>
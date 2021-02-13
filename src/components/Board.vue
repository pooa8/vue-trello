<template>
    <div>
        Board
        <div v-if="loading">loading board...</div>
        <div v-else>
            <div>bid: {{bid}} </div>
            <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
            <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
        </div>
        <hr />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bid: 0,
            loading: false
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() { // 백엔드 API를 호출하고, 데이터를 요청하는 함수
            this.loading = true
            setTimeout(() => {
                this.bid = this.$route.params.bid
                this.loading = false
            }, 500)
        }
    }
}
</script>

<style>

</style>
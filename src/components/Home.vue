<template>
    <div>
        Home
        <div>
            Board Lists:
            <div v-if="loading">Loading...</div>
            <div v-else><!-- when loading completed -->
                API result: <pre>{{apiRes}}</pre>
                <div v-if="error"><pre>{{error}}</pre></div>
            </div>
            <ul>
                <li>
                    <router-link to="/b/1">Board 1</router-link>
                </li>
                <li>
                    <router-link to="/b/2">Board 2</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            loading: false,
            apiRes: '',
            error: ''
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.loading = true

            // promise 를 반환
            axios.get('http://localhost:3000/health')
             .then(res => {
                 this.apiRes = res.data
             })
             .catch(res => {
                 this.error = res.response.data
             })
             .finally(() => {
                 this.loading = false
             })

            // request 객체
            const req = new XMLHttpRequest()
            // 메소드명, 주소
            req.open('GET', 'http://localhost:3000/health')
            // 클라이언트 쪽에서 백엔드 서버로 요청이 날라감 
            req.send()
            // 요청이 완료되면 load 이벤트가 발생되므로 이를 받음
            req.addEventListener('load', () => {
                this.loading = false
                this.apiRes = {
                    status: req.status,
                    statusText: req.statusText,
                    response: JSON.parse(req.response) // response body. 문자열이므로 JSON 으로 parsing
                }
            })
        }
    }
}
</script>

<style>

</style>
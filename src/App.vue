<template>
  <div id="app">
    여기서부터 코드를 시작합니다!
    
    <!-- 라우팅에 따라 컴포넌트가 대체되는 부분 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>

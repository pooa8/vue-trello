import Vue from 'vue'
import App from './App.vue'

const Login = { template: '<div>Login Page</div>' }

const routes = {
  '/': App,
  '/login': Login  // login component
}

new Vue({
  el: '#app',
  computed: {
    VueComponent() {
      // path 경로를 route map 에서 찾고, 없으면 404 template return
      return routes[window.location.pathname] ||
        { template: '<div>Page not found</div>' }
    }
  },
  render(h) {
    return h(this.VueComponent)
  }
})

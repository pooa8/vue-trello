import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    })
      .then(result => result.data) // body data
      .catch(result => {
          const {status} = result.response
          if (status === UNAUTHORIZED) onUnauthorized()
          throw result.response
      })
}

// 모든 request 날리기 전에 header 값에 token 정보를 설정
export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

// 브라우저 새로고침에도 token 정보 유지
const {token} = localStorage
if (token) setAuthInHeader(token)

export const board = {
    fetch() {
        return request('get', '/boards')
    },
    created(title) {
        return request('post', '/boards', {title})
    }
}

export const auth = {
    login(email, password) {
        return request('post', '/login', {email, password})
    }
}
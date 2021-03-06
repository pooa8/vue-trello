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

export const board = {
    fetch(id) {
        return id ? request('get', `/boards/${id}`) : request('get', '/boards')
    },
    create(title) {
        return request('post', '/boards', {title})
    },
    destory(id) {
        return request('delete', `/boards/${id}`)
    },
    update(id, payload) {
        return request('put', `/boards/${id}`, payload)
    }
}

export const list = {
    create(payload) {
        return request('post', '/lists', payload)
    }
}

export const card = {
    fetch(id) {
        return request('get', `/cards/${id}`)
    },
    create(title, listId, pos) {
        return request('post', '/cards', {title, listId, pos}) // 객체로 전달
    },
    update(id, payload) {
        return request('put', `/cards/${id}`, payload)
    },
    destory(id) {
        return request('delete', `/cards/${id}`)
    }
}

export const auth = {
    login(email, password) {
        return request('post', '/login', {email, password})
    }
}
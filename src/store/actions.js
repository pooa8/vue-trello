import * as api from '../api'

const actions = {
    ADD_BOARD (_, {title}) {
        // api call
        return api.board.create(title) // promise return
    },
    FETCH_BOARDS ({commit}) {
        return api.board.fetch().then(data => {
            commit('SET_BOARDS', data.list)
        })
    },
    LOGIN ({commit}, {email, password}) {
        return api.auth.login(email, password)
        // 성공 시 accessToken 을 전달
         .then(({accessToken}) => commit('LOGIN', accessToken))
    }
}


export default actions
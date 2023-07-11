import {
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successfull! Redirecting...'
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: ''
        }
    }

    throw new Error(`no such action :${action.type}`)
}

export default reducer

import {
    LOGIN_EXAMINER_BEGIN,
    LOGIN_EXAMINER_SUCCESS,
    LOGIN_EXAMINER_ERROR,
    LOGOUT_EXAMINER,
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
    if (action.type === LOGIN_EXAMINER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === LOGIN_EXAMINER_SUCCESS) {
        return {
            ...state,
            token: action.payload.token,
            module: action.payload.module,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successful! Redirecting...'
        }
    }

    if (action.type === LOGIN_EXAMINER_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGOUT_EXAMINER) {
        return {
            ...initialState,
            module: null,
            token: null,
        }
    }

    throw new Error(`no such action :${action.type}`)
}

export default reducer

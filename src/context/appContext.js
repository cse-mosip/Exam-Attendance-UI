import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import { 
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from './actions'

import reducer from './reducer';

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState = {
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user? JSON.parse(user): null,
    token: token,
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // axios
    const authFetch = axios.create({
        baseURL: 'https://api.publicapis.org'
    })

    // request
    // authFetch.interceptors.request.use((config) => {
    //     config.headers.common['Authorization'] = `Bearer ${state.token}`
    //     return config
    // }, (error) => {
    //     return Promise.reject(error)
    // })

    // response
    // authFetch.interceptors.response.use((response) => {
    //     return response
    // }, (error) => {
    //     if (error.response.status === 401) {
    //         logoutUser()
    //     }
    //     return Promise.reject(error)
    // })

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    
    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })

        try {
            const { data } = await axios.post('/api/v1/auth/login', currentUser)
            const { user, token} = data
            dispatch({ type: LOGIN_USER_SUCCESS, payload: {
                user,
                token
            } })
            // local storage
            addUserToLocalStorage({
                user,
                token
            })
        } catch (error) {
            dispatch({ type: LOGIN_USER_ERROR, payload: {
                msg: error.response.data.msg
            } })
        }
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserToLocalStorage()
    }

    return (
        <AppContext.Provider value={{ 
            ...state, 
            loginUser,
            logoutUser,
            authFetch,
            }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

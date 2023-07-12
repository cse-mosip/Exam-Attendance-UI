import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import {
    LOGIN_EXAMINER_BEGIN,
    LOGIN_EXAMINER_SUCCESS,
    LOGIN_EXAMINER_ERROR,
    LOGOUT_EXAMINER,
} from './actions'

import reducer from './reducer';

const module = localStorage.getItem('module')
const token = localStorage.getItem('token')

const initialState = {
    showAlert: false,
    alertText: '',
    alertType: '',
    module: module? JSON.parse(module): null,
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

    const addModulesToLocalStorage = ({ module, token }) => {
        localStorage.setItem('module', JSON.stringify(module))
        localStorage.setItem('token', token)
    }
    
    const removeModulesFromLocalStorage = () => {
        localStorage.removeItem('module')
        localStorage.removeItem('token')
    }

    const loginExaminer = async (logInData, withEmail=false) => {
        dispatch({ type: LOGIN_EXAMINER_BEGIN })

        try {
            const url = withEmail ? '/attendance/exams/verifyEmail/examiner' : '/attendance/exams/verify/examiner'
            const { data } = await axios.post(url, logInData)
            const { module, token, verification_success} = data
            if(verification_success){
                dispatch({ type: LOGIN_EXAMINER_SUCCESS, payload: {
                        module,
                        token
                    } })
            }

            // local storage
            addModulesToLocalStorage({
                module,
                token
            })
        } catch (error) {
            dispatch({ type: LOGIN_EXAMINER_ERROR, payload: {
                msg: error.response.data.msg
            } })
        }
    }

    const logoutExaminer = () => {
        dispatch({ type: LOGOUT_EXAMINER })
        removeModulesFromLocalStorage()
    }

    return (
        <AppContext.Provider value={{ 
            ...state, 
            loginExaminer: loginExaminer,
            logoutExaminer: logoutExaminer,
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

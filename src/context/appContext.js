import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import {
    LOGIN_EXAMINER_BEGIN,
    LOGIN_EXAMINER_SUCCESS,
    LOGIN_EXAMINER_ERROR,
    LOGOUT_EXAMINER,
} from './actions'

import reducer from './reducer';

const modules = localStorage.getItem('modules')
const token = localStorage.getItem('token')

const initialState = {
    showAlert: false,
    alertText: '',
    alertType: '',
    modules: modules? JSON.parse(modules): null,
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

    const addModulesToLocalStorage = ({ modules, token }) => {
        localStorage.setItem('modules', JSON.stringify(modules))
        localStorage.setItem('token', token)
    }
    
    const removeModulesFromLocalStorage = () => {
        localStorage.removeItem('modules')
        localStorage.removeItem('token')
    }

    const loginExaminer = async (logInData, withEmail=false) => {
        dispatch({ type: LOGIN_EXAMINER_BEGIN })

        try {
            const url = withEmail ? '/attendance/exams/verifyEmail/examiner' : '/attendance/exams/verify/examiner'
            const { data } = await axios.post(url, logInData)
            const { modules, token, verification_success} = data
            if(verification_success){
                dispatch({ type: LOGIN_EXAMINER_SUCCESS, payload: {
                        modules,
                        token
                    } })
            }

            // local storage
            addModulesToLocalStorage({
                modules,
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

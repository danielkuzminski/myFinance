import {signOut} from 'firebase/auth'
import {auth} from '../firebase/config'
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)

    const {dispatch} = useAuthContext()

    const logout = async () => {
        setError(null)

        try {
            await signOut(auth)

            dispatch({type: 'LOGOUT'})
        } catch (err) {
            setError(err.message)
        }
    }

    return {error, logout}
}
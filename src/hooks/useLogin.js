import {signInWithEmailAndPassword} from 'firebase/auth'
import {useAuthContext} from '../hooks/useAuthContext'
import {auth} from '../firebase/config'
import { useState, useEffect } from 'react'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)

    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

            dispatch({type: 'LOGIN', payload: res.user})

            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }
        } catch (err) {
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    },[])

    return {error, isPending, login}
}
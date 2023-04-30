//react
import { useState, useEffect } from "react"

//auth
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

//context
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const [isCancelled, setIsCancelled] = useState(false)
	const {dispatch} = useAuthContext()

	const signup = async (email, password, displayName) => {
		setError(null)
		setIsPending(true)

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)

			if(!res){
				throw new Error('could not sign up')
			}

			//updating user display name
			await updateProfile(res.user, {displayName})
		
			dispatch({type: 'LOGIN', payload: res.user})
			if(!isCancelled){
				setIsPending(false)
			}

			console.log(res.user)

		} catch (err) {
			console.log(err.message)
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

	return {error, isPending, signup}
}
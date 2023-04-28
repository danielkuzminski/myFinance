//react
import { useState } from "react"

//auth
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

//context
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
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

			setIsPending(false)

			console.log(res.user)

		} catch (err) {
			console.log(err.message)
			setError(err.message)
			setIsPending(false)
		}

	}

	return {error, isPending, signup}
}

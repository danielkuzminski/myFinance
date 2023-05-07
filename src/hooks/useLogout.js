//auth
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

//react
import { useState, useEffect } from "react"

//hooks
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
	const [error, setError] = useState(null)
	const [isCancelled, setIsCancelled] = useState(false)

	const { dispatch } = useAuthContext()

	const logout = async () => {
		setError(null)

		try {
			await signOut(auth)

			dispatch({ type: "LOGOUT" })

			if (!isCancelled) {
				setError(null)
			}
		} catch (err) {
			if(!isCancelled){
				setError(err.message)
			}
		}
	}

	useEffect(() => {
		return () => {
			setIsCancelled(true)
		}
	}, [])

	return { error, logout }
}

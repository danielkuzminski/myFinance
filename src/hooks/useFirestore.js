//react
import { useReducer, useEffect, useState } from "react"

// firestore
import { db } from "../firebase/config"

//firebase
import {
	collection,
	addDoc,
	deleteDoc,
	serverTimestamp,
	doc,
} from "firebase/firestore"

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
}

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return { isPending: true, document: null, success: false, error: null }
		case "ADDED_DOCUMENT":
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			}
		case "DELETED_DOCUMENT":
			return { isPending: false, document: null, success: true, error: null }
		case "ERROR":
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const useFirestore = (c) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState)
	const [isCancelled, setIsCancelled] = useState(false)

	//collection reference
	const ref = collection(db, c)

	//only dispatch is not cancelled
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action)
		}
	}

	//add a document
	const addDocument = async (doc) => {
		dispatch({ type: "IS_PENDING" })

		try {
			const createdAt = serverTimestamp()
			const addedDocument = await addDoc(ref, { ...doc, createdAt })
			dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
		}
	}
	//delete a document
	const deleteDocument = async (id) => {
		const deleteRef = doc(db, "transactions", id)
		dispatchIfNotCancelled({ type: "IS_PENDING" })

        try {
            await deleteDoc(deleteRef)
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
            console.log('could not delete')
        }

	}

	// clean up function
	useEffect(() => {
		return () => {
			setIsCancelled(true)
		}
	}, [])

	return { response, addDocument, deleteDocument }
}

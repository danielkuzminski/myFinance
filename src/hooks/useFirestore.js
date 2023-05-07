//react
import { useReducer, useEffect, useState } from "react";

// firestore
import { db } from "../firebase/config";

//firebase
import { collection, addDoc, deleteDoc } from "firebase/firestore";


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING':
            return { isPending: true, document: null, succes: false, error: null}
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, succes: false, error: action.payload }
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
        if(!isCancelled) {
            dispatch(action)
        }
    }

    //add a document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            const addedDocument = await addDoc(ref, doc)
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        } catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }
    //delete a document
    const deleteDocument = async (id) => {
        await deleteDoc(ref, id)
    }

    // clean up function
    useEffect(() => {
        return () => {setIsCancelled(true)}
    }, [])

    return {response, addDocument, deleteDocument}
}
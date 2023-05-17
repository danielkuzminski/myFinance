//react
import { useState, useEffect } from "react";

//firebase config
import { db } from "../firebase/config";

//firestore
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (c) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        let ref = collection(db, c)

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []

            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id})
            })

            setData(results)
            setError(null)
        }, (err) => {
            console.log(err.message)
            setError('could not fetch data')
        })

        return () => unsub()
    }, [c])

    return {data, error}

}
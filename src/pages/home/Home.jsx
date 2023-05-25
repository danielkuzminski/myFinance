//styles
import './Home.css'

//components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

// hooks
import {useAuthContext} from '../../hooks/useAuthContext'
// import { useCollection } from '../../hooks/useCollection'

import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default function Home() {
  const {user} = useAuthContext()
  // const {data, error} = useCollection('transactions' )

  const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        let ref = collection(db, 'transactions')

        let q = query(ref, where('uid', '==', user.uid), orderBy('createdAt', 'desc'), limit(10))

        const unsub = onSnapshot(q, (snapshot) => {
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
      }, [])

  return (
    <div className='container'>
      <div className="content">
        {error && <p>{error}</p>}
        {data && <TransactionList data={data} />}
      </div>
      <div className="sidebar">
        <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}

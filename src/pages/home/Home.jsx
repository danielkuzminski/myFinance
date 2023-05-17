//styles
import './Home.css'

//components
import TransactionForm from './TransactionForm'

// hooks
import {useAuthContext} from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

export default function Home() {
  const {user} = useAuthContext()
  const {data} = useCollection('transactions')

  return (
    <div className='container'>
      <div className="content">
        transaction list
      </div>
      <div className="sidebar">
        <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}

//styles
import './Home.css'

//components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

// hooks
import {useAuthContext} from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

export default function Home() {
  const {user} = useAuthContext()
  const {data, error} = useCollection('transactions')

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

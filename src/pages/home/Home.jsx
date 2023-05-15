//styles
import './Home.css'

//components
import TransactionForm from './TransactionForm'

// hooks
import {useAuthContext} from '../../hooks/useAuthContext'

export default function Home() {
  const {user} = useAuthContext()

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

//styles
import './Home.css'

//components
import TransactionForm from './TransactionForm'

export default function Home() {
  return (
    <div className='container'>
      <div className="content">
        transaction list
      </div>
      <div className="sidebar">
        <TransactionForm />
      </div>
    </div>
  )
}

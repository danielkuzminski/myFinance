//styles
import './Home.css'

//hooks
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionList({data}) {
  const {deleteDocument} = useFirestore('transactions')

  return (
    <ul className='transactions'>
      {data.map((transaction) => (
        <li key={transaction.id}>
          <p className='name'>{transaction.name}</p>
          <p className='amount'>${transaction.amount}</p>
          <button onClick={() => {deleteDocument(transaction.id)}}>x</button>
        </li>
      ))}
    </ul>
  )
}

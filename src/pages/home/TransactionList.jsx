import './Home.css'

export default function TransactionList({data}) {
  return (
    <ul className='transactions'>
      {data.map((transaction) => (
        <li key={transaction.id}>
          <p className='name'>{transaction.name}</p>
          <p className='amount'>${transaction.amount}</p>
        </li>
      ))}
    </ul>
  )
}

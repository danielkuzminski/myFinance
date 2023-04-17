//styles
import './Signup.css'

//react
import { useState } from 'react'

//hooks
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const {error, isPending, signup} = useSignup()

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setDisplayName('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    signup(email, password, displayName)

    resetForm()

    // console.log(email, password, displayName)
  }


  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <h2>Signup</h2>
      <label>
        <span>Email</span>
        <input 
          type="email" 
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input 
          type="password" 
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
        />
      </label>
      <label>
        <span>Display name</span>
        <input 
          type="text" 
          onChange={(e) => {
            setDisplayName(e.target.value)
          }}
          value={displayName}
        />
      </label>
      {!isPending && <button className='btn'>signup</button>}
      {isPending && <button className='btn' disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

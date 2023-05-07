//styles
import './Login.css'

//react
import { useState } from 'react'

//hooks
import {useLogin} from '../../hooks/useLogin'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {error, isPending, login} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)

    console.log(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
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
      <button className='btn'>Login</button>
    </form>
  )
}

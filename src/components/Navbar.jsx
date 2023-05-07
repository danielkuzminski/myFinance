import './Navbar.css'

//router
import { Link } from 'react-router-dom'

//hooks
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const {user} = useAuthContext()
  const {logout} = useLogout()

  return (
    <nav className='navbar'>
        <ul>
            <li className="title">myFinances</li>
            {!user && (
              <>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/signup'>signup</Link></li>
              </>
            )}
            {user && (
              <>
                <li>
                  Witaj {user.displayName}!
                </li>
                <li>
                  <button className='btn' onClick={logout}>logout</button>
                </li>
              </>
            )}

        </ul>
    </nav>
  )
}

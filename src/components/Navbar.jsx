import './Navbar.css'

//router
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='navbar'>
        <ul>
            <li className="title">myFinances</li>
            <li><Link to='/login'>login</Link></li>
            <li><Link to='/signup'>signup</Link></li>
        </ul>
    </nav>
  )
}

//styles
import './App.css';

//router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

//components
import Navbar from './components/Navbar';

//hooks
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (<BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/signup' />} />
          <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup/> } />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login /> } />
        </Routes>
      </BrowserRouter>)}
    </div>
  );
}

export default App;

// import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/tracker/Home'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element = { <Auth />}/>
          <Route path='/expense-tracker' exact element = { <Home /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './Components/Cards'
import Banner from './Components/Banner'
import CreateForm from './Components/CreateForm'
import Show from './Components/Show';
import Footer from './Components/Footer';
import EditForm from './Components/EditFrom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/add" element={<CreateForm />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App

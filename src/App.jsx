import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './assets/component/pages/login'
import Dashboard from './assets/component/pages/dashboard'
import AddShop from './assets/component/pages/addShop'
import ViewAllGoods from './assets/component/pages/viewAllGoods'
function App() {


  return (
 <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/add-shop' element={<AddShop/>}/>
    <Route path='/view-all-goods' element={<ViewAllGoods/>}/>
  </Routes>
</BrowserRouter>



  )
}

export default App

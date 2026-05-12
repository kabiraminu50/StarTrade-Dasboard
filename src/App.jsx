import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './assets/pages/auth/login'
import Dashboard from './assets/pages/businessOwner/dashboard'
import AddShop from './assets/pages/businessOwner/addShop'
import ViewAllGoods from './assets/pages/businessOwner/viewAllGoods'
import Transfer from './assets/pages/businessOwner/transfer'
import UpdateItem from './assets/pages/businessOwner/updateItem'
import ShopFeature from './assets/pages/businessOwner/shopFeature'
function App() {


  return (
 <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/add-shop' element={<AddShop/>}/>
    <Route path='/view-all-goods' element={<ViewAllGoods/>}/>
    <Route path='/transfer' element={<Transfer/>}/>
    <Route path="/update-item/:id" element={<UpdateItem />} />
    <Route path='/shop-feature' element={<ShopFeature/>}/>
  </Routes>

</BrowserRouter>



  )
}

export default App

import React from 'react'
import './bottomNavigation.css'
import { useNavigate } from 'react-router-dom'
import {
  House,
  Heart,
  Logs,
  ShoppingCart
} from 'lucide-react'

function BottomNavigation() {
const navigate = useNavigate();


  return (
    <div className='bottomNavigation'>

      <button className='navItem activeNav' 
      onClick={()=>{navigate("/customer/dashboard")}} >
        <House size={22} />
        <span>Home</span>
      </button>

      <button className='navItem' onClick={()=>{navigate("/customer/fevoriteshop")}} >
        <Heart size={22} />
        <span>Fevorite store</span>
      </button>

      <button className='navItem' onClick={()=>{navigate("/customer/all-items")}} > 
        < Logs size={22} />
        <span>Items</span>
      </button>

      <button className='navItem' onClick={()=>{navigate("/customer/cart")}}>
        <ShoppingCart size={22} />
        <span>Cart</span>
      </button>

    </div>
  )
}

export default BottomNavigation
import React from 'react'
import './TopNavbar.css'

import {
  ArrowLeft,
  Bell,
  Sparkles
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

function TopNavbar() {

  const navigate = useNavigate()

  return (

    <div className='topNavbar'>

      {/* LEFT SIDE */}

      <div className='topNavbarLeft'>

        <button
          className='backBtn'
          onClick={() => {
            navigate("/customer/dashboard")
          }}
        >
          <ArrowLeft size={22} />
        </button>

        {/* BRAND */}

        <div className='brandName'>

          <Sparkles
            size={20}
            fill="#F4B400"
            color="#F4B400"
          />

          <h2>Trade</h2>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className='topNavbarRight'>

        {/* Notification */}

        <div className='notificationWrapper'>

          <Bell size={22} />

          <span className='notificationCount'>
            3
          </span>

        </div>

        {/* Profile */}

        <button
          className='profileAvatar'
          onClick={() => {
            navigate("/customer/profile")
          }}
        >
          JD
        </button>

      </div>

    </div>

  )
}

export default TopNavbar
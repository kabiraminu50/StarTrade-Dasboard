import React from 'react'
import './PayOut.css'

import TopNavbar from '../customerComponent/TopNavbar'
import Transfer from '../../businessOwner/Transfer'

function PayOut() {
  return (
    <div className='payOutPage'>
      <TopNavbar />
      <Transfer />
    </div>
  )
}

export default PayOut
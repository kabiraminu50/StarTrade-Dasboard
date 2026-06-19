import React from 'react'
import './payOut.css'

import TopNavbar from '../customerComponent/topNavbar'
import Transfer from '../../businessOwner/transfer'

function PayOut() {
  return (
    <div className='payOutPage'>
      <TopNavbar />
      <Transfer />
    </div>
  )
}

export default PayOut
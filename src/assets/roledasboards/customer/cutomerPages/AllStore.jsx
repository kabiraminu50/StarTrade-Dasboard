import React from 'react'

import TopNavbar from '../customerComponent/TopNavbar'
import SearchBar from '../customerComponent/SearchBar'
import CategoryTabs from '../customerComponent/CategoryTabs'
import FeaturedShopsSection from '../customerComponent/FeaturedShopsSection'
import AllShopsSection from '../customerComponent/AllShopsSection'
import BottomNavigation from '../customerComponent/BottomNavigation'
import './AllStore.css'
function AllShops() {
  return (
    <div className='allShopsPage'>

      <TopNavbar />

      <SearchBar />

      <CategoryTabs />

      <FeaturedShopsSection/>
    
      <BottomNavigation />

    </div>
  )
}

export default AllShops
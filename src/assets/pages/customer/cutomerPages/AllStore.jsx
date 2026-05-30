import React from 'react'

import TopNavbar from '../customerComponent/topNavbar'
import SearchBar from '../customerComponent/SearchBar'
import CategoryTabs from '../customerComponent/categoryTabs'
import FeaturedShopsSection from '../customerComponent/featuredShopsSection'
import AllShopsSection from '../customerComponent/allShopsSection'
import BottomNavigation from '../customerComponent/bottomNavigation'
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
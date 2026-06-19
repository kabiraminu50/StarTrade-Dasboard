import React from 'react'
import './SearchBar.css'

import { Search } from 'lucide-react'

function SearchBar() {
  return (
    <div className='searchBarContainer'>

      <div className='searchBar'>

        {/* SEARCH ICON */}
        <Search size={20} className='searchIcon' />

        {/* INPUT */}
        <input
          type='text'
          placeholder='Search shops...'
        />

      </div>

    </div>
  )
}

export default SearchBar
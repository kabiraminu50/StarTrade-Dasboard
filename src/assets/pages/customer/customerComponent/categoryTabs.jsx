import React from 'react'
import './categoryTabs.css'

const categories = [
  'All',
  'Groceries',
  'Fashion',
  'Electronics',
  'Restaurants',
  'Pharmacy',
  'Others'
]

function CategoryTabs() {
  return (
    <div className='categoryTabsContainer'>

      <div className='categoryTabs'>

        {
          categories.map((category, index) => (
            <button
              key={index}
              className={`categoryBtn ${index === 0 ? 'activeCategory' : ''}`}
            >
              {category}
            </button>
          ))
        }

      </div>

    </div>
  )
}

export default CategoryTabs
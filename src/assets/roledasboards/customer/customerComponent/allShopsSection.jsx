import React from 'react'
import './allShopsSection.css'

function AllShopsSection() {

  const shops = [
    {
      id: 1,
      name: 'FreshMart',
      category: 'Groceries',
      rating: '4.8'
    },
    {
      id: 2,
      name: 'Urban Fashion',
      category: 'Fashion',
      rating: '4.6'
    }
  ]

  return (
    <div className='allShopsSection'>

      <div className='sectionHeader'>
        <h2>All Shops</h2>

        <select>
          <option>Popular</option>
          <option>Newest</option>
        </select>
      </div>

      <div className='shopsList'>

        {
          shops.map(shop => (
            <div className='shopItem' key={shop.id}>

              <div className='shopLogo'>
                {shop.name.charAt(0)}
              </div>

              <div className='shopDetails'>
                <h3>{shop.name}</h3>
                <p>{shop.category}</p>
                <span>⭐ {shop.rating}</span>
              </div>

              <button>
                Open
              </button>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default AllShopsSection
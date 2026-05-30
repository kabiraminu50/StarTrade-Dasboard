import React from 'react'
import './featuredShopsSection.css'

function FeaturedShopsSection() {

  const featuredShops = [
    {
      id: 1,
      name: 'FreshMart',
      category: 'Groceries',
      rating: '4.8',
      delivery: '15 mins'
    },
    {
      id: 2,
      name: 'Tech Hub',
      category: 'Electronics',
      rating: '4.7',
      delivery: '20 mins'
    }
  ]

  return (
    <div className='featuredSection'>

      {/* TOP */}
      <div className='sectionHeader'>
        <h2>Featured Shops</h2>
        <button>View All</button>
      </div>

      {/* CARDS */}
      <div className='featuredCards'>

        {
          featuredShops.map(shop => (
            <div className='featuredCard' key={shop.id}>

              <div className='featuredImage'>
                <span>20% OFF</span>
              </div>

              <div className='featuredContent'>

                <h3>{shop.name}</h3>
                <p>{shop.category}</p>

                <div className='shopInfo'>
                  <span>⭐ {shop.rating}</span>
                  <span>🚚 {shop.delivery}</span>
                </div>

                <button>Open Shop</button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default FeaturedShopsSection
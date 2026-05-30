import './FavouriteStoreComponent.css'
import {
  Heart,
  Plus,
} from "lucide-react";

const favouriteShops = [
  {
    id: 1,
    name: "FreshMart Store",
    category: "Supermarket",
    logo: "🛒",
  },

  {
    id: 2,
    name: "QuickStop",
    category: "Convenience Store",
    logo: "⚡",
  },

  {
    id: 3,
    name: "TechWorld",
    category: "Electronics",
    logo: "📱",
  },

  {
    id: 4,
    name: "BeautyHub",
    category: "Beauty & Health",
    logo: "💄",
  },

  {
    id: 5,
    name: "HomeCare",
    category: "Home & Living",
    logo: "🏠",
  },
];

const FavouriteShop = () => {

  return (
    <section className="favourite-shop">

      {/* HEADER */}
      <div className="shop-header">

        <h2>Shops</h2>

        <button className="view-all-btn">
          View All
        </button>

      </div>

      {/* EMPTY STATE */}
      {favouriteShops.length === 0 ? (

        <div className="empty-shop">

          <p>No favourite shop is available</p>

        </div>

      ) : (

        <div className="shop-grid">

          {favouriteShops.map((shop) => (

            <div
              key={shop.id}
              className="shop-card"
            >

              <button className="fav-btn">
                <Heart size={18} />
              </button>

              <div className="shop-logo">
                {shop.logo}
              </div>

              <h3>{shop.name}</h3>

              <p>{shop.category}</p>

            </div>

          ))}

        </div>

      )}

      {/* ADD SHOP BUTTON */}

      <button className="add-shop-btn">

        <Plus size={18} />

        Add Favourite Shop

      </button>

    </section>
  );
};

export default FavouriteShop;
import React from "react";

import TopNavbar from "../customerComponent/topNavbar";
import SearchBar from "../customerComponent/SearchBar";
import AllStoreItems from "../customerComponent/AllStoreItems";

import "./CustomerAllItems.css";

function AllItems({
  cart,
  increase,
  decrease,
}) {
  return (
    <div className="all-items-page">
      <TopNavbar />

      <div className="all-items-wrapper">
        <SearchBar />

        <AllStoreItems
          cart={cart}
          increase={increase}
          decrease={decrease}
        />
      </div>
    </div>
  );
}

export default AllItems;
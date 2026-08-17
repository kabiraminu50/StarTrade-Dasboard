import React from "react";

import {
  Truck,
  Store,
  ArrowRight,
} from "lucide-react";

import "./NetworkOverview.css";

const NetworkOverview = ({
  totalDA = 0,
  totalBO = 0,

  onViewAll,
  onViewDetails,
}) => {

  /* =========================================
     MRM NETWORK
  ========================================= */

  const networkItems = [

    {
      id: "da",
      title: "Total DA",
      subtitle: "under your MRM",
      value: totalDA,
      icon: Truck,
      color: "blue",
    },

    {
      id: "bo",
      title: "Total BO",
      subtitle: "under your MRM",
      value: totalBO,
      icon: Store,
      color: "pink",
    },

  ];


  /* =========================================
     RENDER
  ========================================= */

  return (

    <section className="network-overview">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="network-header">

        <div className="network-heading">

          <h2>
            My Network Overview
          </h2>

          <p>
            Overview of your managed network
          </p>

        </div>


        <button
          type="button"
          className="network-view-all"
          onClick={onViewAll}
        >

          <span>
            View All
          </span>

          <ArrowRight size={20} />

        </button>

      </div>


      {/* =====================================
          NETWORK GRID
      ===================================== */}

      <div className="network-grid mrm-network-grid">

        {networkItems.map((item) => {

          const Icon = item.icon;

          return (

            <div
              className="network-card"
              key={item.id}
            >


              {/* =================================
                  ICON
              ================================= */}

              <div
                className={`network-icon ${item.color}`}
              >

                <Icon
                  size={27}
                  strokeWidth={2}
                />

              </div>


              {/* =================================
                  CONTENT
              ================================= */}

              <div className="network-card-content">


                {/* TITLE */}

                <div className="network-title-wrapper">

                  <p className="network-title">
                    {item.title}
                  </p>

                  <p className="network-subtitle">
                    {item.subtitle}
                  </p>

                </div>


                {/* VALUE */}

                <h3 className="network-value">

                  {Number(
                    item.value
                  ).toLocaleString()}

                </h3>


                {/* =================================
                    DETAILS
                ================================= */}

                <button
                  type="button"
                  className={`network-details ${item.color}`}
                  onClick={() =>
                    onViewDetails?.(
                      item.id
                    )
                  }
                >

                  <span>
                    View details
                  </span>

                  <ArrowRight
                    size={19}
                  />

                </button>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );
};


export default NetworkOverview;
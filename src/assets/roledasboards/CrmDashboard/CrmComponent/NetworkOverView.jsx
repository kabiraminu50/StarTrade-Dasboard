import React from "react";

import {
  UserRound,
  ArrowRight,
} from "lucide-react";

import "./NetworkOverview.css";

const NetworkOverview = ({
  totalCustomers = 0,

  onViewAll,
  onViewDetails,
}) => {

  /* =========================================
     CRM NETWORK
  ========================================= */

  const networkItems = [

    {
      id: "customers",
      title: "Total Customers",
      subtitle: "under your CRM",
      value: totalCustomers,
      icon: UserRound,
      color: "gold",
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

      <div className="network-grid crm-network-grid">

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


                {/* DETAILS */}

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

                  <ArrowRight size={19} />

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
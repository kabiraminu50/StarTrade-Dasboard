import React from "react";

import {
  Users,
  UserRound,
  Store,
  Truck,
  ArrowRight,
} from "lucide-react";

import "./NetworkOverview.css";

const NetworkOverview = ({
  totalRM = 0,
  totalMRM = 0,
  totalSC = 0,
  totalDA = 0,
  totalCRM = 0,
  totalCustomers = 0,
  totalBO = 0,

  onViewAll,
  onViewDetails,
}) => {

  /* =========================================
     SA NETWORK ITEMS
  ========================================= */

  const networkItems = [

    {
      id: "rm",
      title: "Total RM",
      subtitle: "Relationship Managers",
      value: totalRM,
      icon: Users,
      color: "purple",
    },

    {
      id: "mrm",
      title: "Total MRM",
      subtitle: "under your RM",
      value: totalMRM,
      icon: Users,
      color: "blue",
    },

    {
      id: "sc",
      title: "Total SC",
      subtitle: "under your MRM",
      value: totalSC,
      icon: Users,
      color: "cyan",
    },

    {
      id: "da",
      title: "Total DA",
      subtitle: "under your MRMs",
      value: totalDA,
      icon: Truck,
      color: "green",
    },

    {
      id: "crm",
      title: "Total CRM",
      subtitle: "under your SC",
      value: totalCRM,
      icon: Users,
      color: "gold",
    },

    {
      id: "customers",
      title: "Total Customers",
      subtitle: "under your CRM",
      value: totalCustomers,
      icon: UserRound,
      color: "orange",
    },

    {
      id: "bo",
      title: "Total BO",
      subtitle: "under your MRMs",
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
            Overview of your entire network
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

      <div className="network-grid">

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
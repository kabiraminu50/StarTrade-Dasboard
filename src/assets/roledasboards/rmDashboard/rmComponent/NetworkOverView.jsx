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
  totalSC = 0,
  totalMRM = 0,
  totalDA = 0,
  totalCRM = 0,
  totalCustomers = 0,
  totalBO = 0,

  onViewAll,
  onViewDetails,
}) => {
  /* =========================================
     RM NETWORK ITEMS
  ========================================= */

  const networkItems = [
    {
      id: "sc",
      title: "Total SC",
      subtitle: "under your RM",
      value: totalSC,
      icon: Users,
      color: "purple",
    },

    {
      id: "mrm",
      title: "Total MRM",
      subtitle: "under your SCs",
      value: totalMRM,
      icon: Users,
      color: "blue",
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
      subtitle: "under your SCs",
      value: totalCRM,
      icon: Users,
      color: "cyan",
    },

    {
      id: "customers",
      title: "Total Customers",
      subtitle: "under your CRMs",
      value: totalCustomers,
      icon: UserRound,
      color: "gold",
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

      <div className="network-grid">

        {networkItems.map((item) => {

          const Icon = item.icon;

          return (
            <article
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
                  {Number(item.value).toLocaleString()}
                </h3>


                {/* DETAILS */}

                <button
                  type="button"
                  className={`network-details ${item.color}`}
                  onClick={() =>
                    onViewDetails?.(item.id)
                  }
                >
                  <span>
                    View details
                  </span>

                  <ArrowRight size={19} />
                </button>

              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
};

export default NetworkOverview;
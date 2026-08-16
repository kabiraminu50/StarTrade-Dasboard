import React from "react";
import {
  Users,
  UserRound,
  Store,
  ArrowRight,
} from "lucide-react";

import "./NetworkOverview.css";

const NetworkOverview = ({
  totalSC = 0,
  totalBRM = 0,
  totalCRM = 0,
  totalCustomers = 0,
  totalBO = 0,

  onViewAll,
  onViewDetails,
}) => {
  const networkItems = [
    {
      id: "sc",
      title: "Total SC",
      subtitle: "",
      value: totalSC,
      icon: Users,
      color: "purple",
    },
    {
      id: "brm",
      title: "Total BRM",
      subtitle: "under your SC",
      value: totalBRM,
      icon: Users,
      color: "blue",
    },
    {
      id: "crm",
      title: "Total CRM",
      subtitle: "under your SC",
      value: totalCRM,
      icon: Users,
      color: "cyan",
    },
    {
      id: "customers",
      title: "Total Customers",
      subtitle: "under your CRM",
      value: totalCustomers,
      icon: UserRound,
      color: "gold",
    },
    {
      id: "bo",
      title: "Total BO",
      subtitle: "under your BRMs",
      value: totalBO,
      icon: Store,
      color: "pink",
    },
  ];

  return (
    <section className="network-overview">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="network-header">

        <h2>My Network Overview</h2>

        <button
          className="network-view-all"
          onClick={onViewAll}
        >
          <span>View All</span>
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

              {/* ICON */}

              <div
                className={`network-icon ${item.color}`}
              >
                <Icon
                  size={27}
                  strokeWidth={2}
                />
              </div>


              {/* CONTENT */}

              <div className="network-card-content">

                <div className="network-title-wrapper">

                  <p className="network-title">
                    {item.title}
                  </p>

                  {item.subtitle && (
                    <p className="network-subtitle">
                      {item.subtitle}
                    </p>
                  )}

                </div>


                <h3 className="network-value">
                  {Number(item.value).toLocaleString()}
                </h3>


                {/* DETAILS */}

                <button
                  className={`network-details ${item.color}`}
                  onClick={() =>
                    onViewDetails?.(item.id)
                  }
                >
                  <span>View details</span>

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
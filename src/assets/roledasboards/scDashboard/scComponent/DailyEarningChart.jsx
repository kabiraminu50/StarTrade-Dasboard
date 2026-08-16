import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";

import "./DailyEarningChart.css";

const DailyEarningChart = ({
  earnings = [],
  loading = false,
  onPeriodChange,
}) => {
  const [period, setPeriod] = useState("7");

  // ==========================================
  // FILTER DATA
  // ==========================================

  const chartData = useMemo(() => {
    return earnings.slice(-Number(period));
  }, [earnings, period]);

  // ==========================================
  // PERIOD CHANGE
  // ==========================================

  const handlePeriodChange = (value) => {
    setPeriod(value);

    if (onPeriodChange) {
      onPeriodChange(Number(value));
    }
  };

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return `₦${Number(value).toLocaleString("en-NG", {
      maximumFractionDigits: 0,
    })}`;
  };

  // ==========================================
  // Y AXIS FORMAT
  // ==========================================

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `₦${Math.round(value / 1000)}K`;
    }

    return `₦${value}`;
  };

  // ==========================================
  // CUSTOM TOOLTIP
  // ==========================================

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    return (
      <div className="earning-tooltip">

        <p className="earning-tooltip-date">
          {label}
        </p>

        <p className="earning-tooltip-value">
          {formatCurrency(payload[0].value)}
        </p>

        <span className="earning-tooltip-label">
          Daily earnings
        </span>

      </div>
    );
  };

  return (
    <section className="daily-earning-card">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="earning-header">

        <div>
          <h2>Daily Earning Trend</h2>

          <p className="earning-description">
            Track your daily network earnings
          </p>
        </div>

        <div className="earning-select-wrapper">

          <select
            value={period}
            onChange={(event) =>
              handlePeriodChange(event.target.value)
            }
          >
            <option value="7">
              Last 7 Days
            </option>

            <option value="14">
              Last 14 Days
            </option>

            <option value="30">
              Last 30 Days
            </option>

            <option value="90">
              Last 90 Days
            </option>
          </select>

          <ChevronDown
            size={16}
            className="earning-select-icon"
          />

        </div>

      </div>


      {/* ======================================
          CHART
      ====================================== */}

      <div className="earning-chart-wrapper">

        {loading ? (

          <div className="earning-state">
            <div className="earning-loader"></div>

            <span>
              Loading earnings...
            </span>
          </div>

        ) : chartData.length === 0 ? (

          <div className="earning-state">

            <span>
              No earnings available
            </span>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >

              {/* ==================================
                  GRADIENT
              ================================== */}

              <defs>

                <linearGradient
                  id="starTradeEarningGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#F5C100"
                    stopOpacity={0.42}
                  />

                  <stop
                    offset="70%"
                    stopColor="#F5C100"
                    stopOpacity={0.12}
                  />

                  <stop
                    offset="100%"
                    stopColor="#F5C100"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>


              {/* ==================================
                  GRID
              ================================== */}

              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="0"
              />


              {/* ==================================
                  X AXIS
              ================================== */}

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#8D8D8D",
                  fontSize: 11,
                }}
                tickMargin={12}
                minTickGap={18}
              />


              {/* ==================================
                  Y AXIS
              ================================== */}

              <YAxis
                axisLine={false}
                tickLine={false}
                width={48}
                tick={{
                  fill: "#8D8D8D",
                  fontSize: 10,
                }}
                tickFormatter={formatYAxis}
                domain={[
                  0,
                  "auto",
                ]}
              />


              {/* ==================================
                  TOOLTIP
              ================================== */}

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "rgba(245,193,0,0.35)",
                  strokeWidth: 1,
                }}
              />


              {/* ==================================
                  AREA
              ================================== */}

              <Area
                type="monotone"
                dataKey="amount"

                stroke="#F5C100"
                strokeWidth={2.5}

                fill="url(#starTradeEarningGradient)"

                activeDot={{
                  r: 6,
                  fill: "#F5C100",
                  stroke: "#111216",
                  strokeWidth: 3,
                }}

                dot={{
                  r: 3.5,
                  fill: "#F5C100",
                  stroke: "#F5C100",
                  strokeWidth: 1,
                }}

                animationDuration={700}
              />

            </AreaChart>

          </ResponsiveContainer>

        )}

      </div>

    </section>
  );
};

export default DailyEarningChart;
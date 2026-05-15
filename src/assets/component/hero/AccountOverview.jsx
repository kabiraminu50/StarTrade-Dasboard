// AccountOverview.jsx

import "./AccountOverview.css";
import {
  Wallet,
  User,
  Eye,
  Copy,
} from "lucide-react";

const AccountOverview = () => {
  return (
    <section className="account-overview">

      {/* ACCOUNT NUMBER */}
      <div className="overview-card">

        <div className="overview-top">
          <div className="icon-box">
            <Wallet size={20} />
          </div>

          <Copy size={18} className="action-icon" />
        </div>

        <div className="overview-content">
          <p>Account Number</p>

          <h3>1234 5678 9012</h3>
        </div>

      </div>

      {/* ACCOUNT NAME */}
      <div className="overview-card">

        <div className="overview-top">
          <div className="icon-box">
            <User size={20} />
          </div>
        </div>

        <div className="overview-content">
          <p>Account Name</p>

          <h3>John Doe</h3>
        </div>

      </div>

      {/* WALLET BALANCE */}
      <div className="overview-card">

        <div className="overview-top">
          <div className="icon-box">
            <Wallet size={20} />
          </div>

          <Eye size={18} className="action-icon" />
        </div>

        <div className="overview-content">
          <p>Wallet Balance</p>

          <h3 className="balance">
            ₦50,000.00
          </h3>
        </div>

      </div>

    </section>
  );
};

export default AccountOverview;
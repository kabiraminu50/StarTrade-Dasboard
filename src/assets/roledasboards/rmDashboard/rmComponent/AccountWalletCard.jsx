import React, { useState } from "react";
import { Landmark, Wallet, Copy, Eye, EyeOff } from "lucide-react";
import "./AccountWalletCard.css";

const AccountWalletCard = ({
  accountNumber = "5000 1234 5678",
  walletBalance = 245750.0,
  percentageChange = 18.6,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        accountNumber.replace(/\s/g, "")
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy account number:", error);
    }
  };

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(walletBalance);

  return (
    <section className="account-wallet-wrapper">

      {/* RM ACCOUNT */}
      <div className="account-wallet-card">

        <div className="account-wallet-icon">
          <Landmark size={27} strokeWidth={2} />
        </div>

        <div className="account-wallet-content">
          <p className="account-wallet-label">
            RM Account
          </p>

          <div className="account-number-row">
            <h2>{accountNumber}</h2>

            <button
              className="account-copy-btn"
              onClick={handleCopy}
              title="Copy account number"
            >
              <Copy size={19} />

              {copied && (
                <span className="copy-tooltip">
                  Copied
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="account-wallet-divider"></div>

      {/* WALLET */}
      <div className="account-wallet-card">

        <div className="account-wallet-icon wallet-icon">
          <Wallet size={27} strokeWidth={2} />
        </div>

        <div className="account-wallet-content">
          <p className="account-wallet-label">
            StarTrade Wallet
          </p>

          <div className="wallet-balance-row">

            <h2 className="wallet-balance">
              {showBalance
                ? `₦${formattedBalance}`
                : "₦••••••••"
              }
            </h2>

            <button
              className="wallet-eye-btn"
              onClick={() => setShowBalance(!showBalance)}
              title={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? (
                <Eye size={21} />
              ) : (
                <EyeOff size={21} />
              )}
            </button>

          </div>

          <p className="wallet-change">
            <span>↑ {percentageChange}%</span>
            <small>vs yesterday</small>
          </p>

        </div>
      </div>

    </section>
  );
};

export default AccountWalletCard;
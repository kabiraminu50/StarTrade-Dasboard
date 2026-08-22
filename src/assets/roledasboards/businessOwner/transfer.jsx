import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Transfer.css";

const banks = [
  { name: "Access Bank", code: "044" },
  { name: "GTBank", code: "058" },
  { name: "First Bank", code: "011" },
  { name: "UBA", code: "033" },
  { name: "Zenith Bank", code: "057" },
  { name: "Fidelity Bank", code: "070" },
  { name: "Union Bank", code: "032" },
];

const Transfer = () => {
  const navigate = useNavigate();

  // ===== STATES =====
  const [amount, setAmount] = useState("");
  const [bankSearch, setBankSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // show banks only after 10 digits
  const [showBanks, setShowBanks] = useState(false);

  // ===== FILTER BANKS =====
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  // ===== FETCH ACCOUNT NAME =====
 const fetchAccountName = async (acctNo, bankCode) => {
  try {
    setError("");

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:8000/api/v1/name-enquiry/search",
      {
        accountNumber: acctNo,
        bankCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAccountName(res.data.accountName);

  } catch (err) {
    console.log(err);

    setAccountName("");
    setError("Unable to verify account details");
  }
};
  // ===== SEND MONEY =====
  const handleTransfer = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/v1/payout/withdraw",
        {
          amount,
          accountNumber,
          bankCode: selectedBank.code,
          accountName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transfer successful");

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Transfer failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pro-transfer">

      <h2 className="page-title">Transfer</h2>

      {error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== AMOUNT ===== */}
      <div className="amount-card">
        <span>₦</span>

        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />
      </div>

      {/* ===== ACCOUNT NUMBER ===== */}
      <div className="input-box">

        <label>Account Number</label>

        <input
          type="text"
          placeholder="0123456789"
          maxLength={10}
          value={accountNumber}
          onChange={(e) => {

            const value = e.target.value;

            setAccountNumber(value);

            // show banks after 10 digits
            if (value.length === 10) {
              setShowBanks(true);
            } else {
              setShowBanks(false);
              setSelectedBank(null);
              setAccountName("");
            }
          }}
        />
      </div>

      {/* ===== SHOW BANKS ONLY AFTER 10 DIGITS ===== */}
      {showBanks && (
        <div className="bank-section">

          <input
            type="text"
            placeholder="Search bank"
            value={bankSearch}
            onChange={(e) =>
              setBankSearch(e.target.value)
            }
          />

          <div className="bank-list">

            {filteredBanks.map((bank) => (

              <div
                key={bank.code}
                className={`bank-item ${
                  selectedBank?.code === bank.code
                    ? "active"
                    : ""
                }`}
                onClick={() => {

                  setSelectedBank(bank);

                  setBankSearch(bank.name);

                  // fetch account name automatically
                  fetchAccountName(
                    accountNumber,
                    bank.code
                  );
                }}
              >
                {bank.name}
              </div>

            ))}

          </div>

        </div>
      )}

      {/* ===== VERIFIED ACCOUNT NAME ===== */}
      {accountName && (
        <div className="verified">
          ✓ {accountName}
        </div>
      )}

      {/* ===== SUBMIT ===== */}
      <button
        className="send-btn"
        disabled={
          loading ||
          !amount ||
          !selectedBank ||
          !accountNumber ||
          !accountName
        }
        onClick={handleTransfer}
      >
        {loading
          ? "Processing..."
          : "Continue"}
      </button>

    </div>
  );
};

export default Transfer;
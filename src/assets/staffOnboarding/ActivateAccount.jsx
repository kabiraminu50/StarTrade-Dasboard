import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ActivateAccount = () => {
  // ==========================================
  // ACTIVATION TOKEN FROM URL
  // ==========================================

  const { id: activationToken } = useParams();

  const navigate = useNavigate();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    pin: "",
    confirmPin: "",
  });

  // ==========================================
  // UI STATE
  // ==========================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);
  const [accountData, setAccountData] = useState(null);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ------------------------------------------
    // PIN VALIDATION
    // ------------------------------------------

    if (name === "pin" || name === "confirmPin") {
      // Numbers only
      if (!/^\d*$/.test(value)) {
        return;
      }

      // Maximum 4 digits
      if (value.length > 4) {
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous error while typing
    setError("");
  };

  // ==========================================
  // SUBMIT ACTIVATION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================
    // ACTIVATION TOKEN VALIDATION
    // ==========================================

    if (!activationToken) {
      setError(
        "Invalid activation link. Please use the activation link sent to your email."
      );

      return;
    }

    // ==========================================
    // PASSWORD REQUIRED
    // ==========================================

    if (!form.password) {
      setError("Please enter a password.");
      return;
    }

    // ==========================================
    // PASSWORD LENGTH
    // ==========================================

    if (
      form.password.length < 8 ||
      form.password.length > 12
    ) {
      setError(
        "Password must be between 8 and 12 characters."
      );

      return;
    }

    // ==========================================
    // PASSWORD COMPLEXITY
    // ==========================================

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,12}$/;

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must contain uppercase, lowercase, number and special character."
      );

      return;
    }

    // ==========================================
    // CONFIRM PASSWORD
    // ==========================================

    if (!form.confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ==========================================
    // PIN VALIDATION
    // ==========================================

    if (!/^\d{4}$/.test(form.pin)) {
      setError(
        "Transaction PIN must be exactly 4 digits."
      );

      return;
    }

    // ==========================================
    // CONFIRM PIN
    // ==========================================

    if (form.pin !== form.confirmPin) {
      setError("Transaction PINs do not match.");
      return;
    }

    // ==========================================
    // START ACTIVATION
    // ==========================================

    try {
      setLoading(true);

      // ==========================================
      // CALL EXISTING BACKEND
      // ==========================================

      const response = await axios.patch(
        `http://localhost:8000/api/v1/auth/createsecurity/${activationToken}`,
        {
          password: form.password,
          confirmPassword: form.confirmPassword,
          pin: form.pin,
          confirmPin: form.confirmPin,
        },
        {
          withCredentials: true,
        }
      );

      // ==========================================
      // SUCCESS
      // ==========================================

      if (response.data?.success) {
        setAccountData(response.data.data);

        setSuccess(true);

        // Clear sensitive information
        setForm({
          password: "",
          confirmPassword: "",
          pin: "",
          confirmPin: "",
        });
      } else {
        setError(
          response.data?.message ||
            "Unable to activate account."
        );
      }

    } catch (err) {
      console.error(
        "Account activation error:",
        err
      );

      // ==========================================
      // BACKEND ERROR
      // ==========================================

      const backendMessage =
        err.response?.data?.message;

      setError(
        backendMessage ||
          "Unable to activate your account. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================

  if (success) {
    return (
      <div className="activate-account-page">

        <div className="activate-account-card">

          <div className="activation-success-icon">
            ✓
          </div>

          <h1>Account Activated</h1>

          <p>
            Your StarTrade account has been
            successfully activated.
          </p>

          {/* ==================================
              USER DETAILS
          ================================== */}

          {accountData?.user && (
            <div className="account-details">

              <h3>Account Information</h3>

              <p>
                <strong>Name:</strong>{" "}
                {accountData.user.firstName}{" "}
                {accountData.user.lastName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {accountData.user.email}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {accountData.user.accountStatus}
              </p>

            </div>
          )}

          {/* ==================================
              WALLET DETAILS
          ================================== */}

          {accountData?.wallet && (
            <div className="account-details">

              <h3>Account Details</h3>

              <p>
                <strong>Account Name:</strong>{" "}
                {accountData.wallet.accountName}
              </p>

              <p>
                <strong>Account Number:</strong>{" "}
                {accountData.wallet.accountNumber}
              </p>

              <p>
                <strong>Bank:</strong>{" "}
                {accountData.wallet.bankName}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {accountData.wallet.status}
              </p>

            </div>
          )}

          {/* ==================================
              LOGIN
          ================================== */}

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Continue to Login
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // ACTIVATION FORM
  // ==========================================

  return (
    <div className="activate-account-page">

      <div className="activate-account-card">

        {/* ====================================
            HEADER
        ==================================== */}

        <h1>Activate Your Account</h1>

        <p>
          Create your password and transaction PIN
          to complete your StarTrade account
          activation.
        </p>

        {/* ====================================
            ERROR
        ==================================== */}

        {error && (
          <div className="activation-error">
            {error}
          </div>
        )}

        {/* ====================================
            FORM
        ==================================== */}

        <form onSubmit={handleSubmit}>

          {/* ==================================
              PASSWORD
          ================================== */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-input">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                disabled={loading}
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            <small>
              8–12 characters with uppercase,
              lowercase, number and special
              character.
            </small>

          </div>

          {/* ==================================
              CONFIRM PASSWORD
          ================================== */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="password-input">

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                disabled={loading}
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {/* ==================================
              TRANSACTION PIN
          ================================== */}

          <div className="form-group">

            <label htmlFor="pin">
              Transaction PIN
            </label>

            <input
              id="pin"
              type="password"
              name="pin"
              value={form.pin}
              onChange={handleChange}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              inputMode="numeric"
              autoComplete="new-password"
              disabled={loading}
            />

          </div>

          {/* ==================================
              CONFIRM TRANSACTION PIN
          ================================== */}

          <div className="form-group">

            <label htmlFor="confirmPin">
              Confirm Transaction PIN
            </label>

            <input
              id="confirmPin"
              type="password"
              name="confirmPin"
              value={form.confirmPin}
              onChange={handleChange}
              placeholder="Confirm 4-digit PIN"
              maxLength={4}
              inputMode="numeric"
              autoComplete="new-password"
              disabled={loading}
            />

          </div>

          {/* ==================================
              ACTIVATE BUTTON
          ================================== */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Activating Account..."
              : "Activate Account"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ActivateAccount;
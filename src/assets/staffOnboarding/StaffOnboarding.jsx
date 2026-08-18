import React, { useEffect, useState } from "react";

import RoleSelector from "./components/RoleSelector";
import NinVerification from "./components/NinVerification";
import BvnVerification from "./components/BvnVerification";
import HomeAddress from "./components/HomeAddress";
import ContactDetails from "./components/ContactDetails";
import OnboardingProgress from "./components/OnboardingProgress";

import {
  getOnboardingPermissions,
} from "./onboardingService";

import "./StaffOnboarding.css";


const StaffOnboarding = () => {

  const [allowedRoles, setAllowedRoles] =
    useState([]);

  const [loadingPermissions, setLoadingPermissions] =
    useState(true);

  const [step, setStep] =
    useState(1);

  const [selectedRole, setSelectedRole] =
    useState("");

  const [onboardingId, setOnboardingId] =
    useState(null);

  const [error, setError] =
    useState("");


  /* =========================================
     LOAD PERMISSIONS
  ========================================= */

  useEffect(() => {

    const loadPermissions = async () => {

      try {

        setLoadingPermissions(true);

        const data =
          await getOnboardingPermissions();

        setAllowedRoles(
          data.allowedRoles || []
        );

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Unable to load onboarding permissions."
        );

      } finally {

        setLoadingPermissions(false);

      }

    };

    loadPermissions();

  }, []);


  /* =========================================
     ROLE SELECT
  ========================================= */

  const handleRoleSelect = (role) => {

    setSelectedRole(role);

    setError("");

    setStep(2);

  };


  /* =========================================
     NIN SUCCESS
  ========================================= */

  const handleNinSuccess = (data) => {

    const id =
      data?.onboarding?.id ||
      data?.onboarding?._id;

    if (!id) {

      setError(
        "Onboarding ID was not returned."
      );

      return;
    }

    setOnboardingId(id);

    setError("");

    setStep(3);

  };


  /* =========================================
     BVN
  ========================================= */

  const handleBvnSuccess = () => {

    setError("");

    setStep(4);

  };


  /* =========================================
     ADDRESS
  ========================================= */

  const handleAddressSuccess = () => {

    setError("");

    setStep(5);

  };


  /* =========================================
     CONTACT
  ========================================= */

  const handleContactSuccess = () => {

    setError("");

    setStep(6);

  };


  /* =========================================
     LOADING
  ========================================= */

  if (loadingPermissions) {

    return (
      <div className="staff-onboarding">

        <div className="onboarding-loading">

          <div className="loading-spinner" />

          <p>
            Loading onboarding options...
          </p>

        </div>

      </div>
    );

  }


  /* =========================================
     NO PERMISSION
  ========================================= */

  if (allowedRoles.length === 0) {

    return (
      <div className="staff-onboarding">

        <div className="onboarding-wrapper">

          <div className="onboarding-card">

            <div className="no-permission">

              <h2>
                Onboarding Unavailable
              </h2>

              <p>
                You are not authorized to
                onboard any users.
              </p>

            </div>

          </div>

        </div>

      </div>
    );

  }


  return (

    <div className="staff-onboarding">

      <div className="onboarding-wrapper">

        <header className="onboarding-header">

          <span className="brand-label">
            STARTRADE
          </span>

          <h1>
            Onboarding
          </h1>

          <p>
            Create and verify a new
            StarTrade account.
          </p>

        </header>


        <OnboardingProgress
          currentStep={step}
        />


        {error && (

          <div className="onboarding-error">
            {error}
          </div>

        )}


        <main className="onboarding-card">

          {step === 1 && (

            <RoleSelector
              roles={allowedRoles}
              selectedRole={selectedRole}
              onSelect={handleRoleSelect}
            />

          )}


          {step === 2 && (

            <NinVerification
              role={selectedRole}
              onSuccess={handleNinSuccess}
              onError={setError}
            />

          )}


          {step === 3 && (

            <BvnVerification
              onboardingId={onboardingId}
              onSuccess={handleBvnSuccess}
              onError={setError}
            />

          )}


          {step === 4 && (

            <HomeAddress
              onboardingId={onboardingId}
              onSuccess={handleAddressSuccess}
              onError={setError}
            />

          )}


          {step === 5 && (

            <ContactDetails
              onboardingId={onboardingId}
              onSuccess={handleContactSuccess}
              onError={setError}
            />

          )}


          {step === 6 && (

            <div className="onboarding-success">

              <div className="success-icon">
                ✓
              </div>

              <span className="success-label">
                ONBOARDING COMPLETE
              </span>

              <h2>
                Activation Email Sent
              </h2>

              <p>
                The account has been
                successfully onboarded.
              </p>

            </div>

          )}

        </main>

      </div>

    </div>
  );
};

export default StaffOnboarding;
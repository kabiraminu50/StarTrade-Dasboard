import React from "react";

const steps = [
  "Role",
  "NIN",
  "BVN",
  "Address",
  "Contact",
];


const OnboardingProgress = ({
  currentStep,
}) => {

  return (
    <div className="onboarding-progress">

      {steps.map((label, index) => {

        const stepNumber =
          index + 1;

        const active =
          currentStep >= stepNumber;

        return (
          <React.Fragment key={label}>

            <div
              className={`progress-step ${
                active
                  ? "active"
                  : ""
              }`}
            >

              <span>
                {stepNumber}
              </span>

              <small>
                {label}
              </small>

            </div>


            {index <
              steps.length - 1 && (

              <div
                className={`progress-line ${
                  currentStep >
                  stepNumber
                    ? "active"
                    : ""
                }`}
              />

            )}

          </React.Fragment>
        );

      })}

    </div>
  );
};

export default OnboardingProgress;
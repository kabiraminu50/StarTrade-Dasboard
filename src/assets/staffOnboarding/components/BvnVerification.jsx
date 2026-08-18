import React, {
  useState,
} from "react";

import {
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { verifyBVN }
  from "../onboardingService";


const BvnVerification = ({
  onboardingId,
  onSuccess,
  onError,
}) => {

  const [bvn, setBvn] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();

    onError?.("");


    if (bvn.length !== 11) {

      onError?.(
        "BVN must contain exactly 11 digits."
      );

      return;
    }


    try {

      setLoading(true);


      const data =
        await verifyBVN({
          onboardingId,
          bvn,
        });


      onSuccess?.(data);

    } catch (error) {

      onError?.(
        error.response?.data?.message ||
        "BVN verification failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <form
      className="onboarding-form"
      onSubmit={handleSubmit}
    >

      <div className="step-heading">

        <span className="step-label">
          STEP 03
        </span>

        <h2>
          Verify BVN
        </h2>

        <p>
          Enter the person's 11-digit BVN.
        </p>

      </div>


      <div className="verification-icon">
        <ShieldCheck size={38} />
      </div>


      <div className="form-group">

        <label>
          BVN
        </label>

        <input
          type="text"
          inputMode="numeric"
          maxLength={11}
          value={bvn}
          onChange={(e) =>
            setBvn(
              e.target.value.replace(
                /\D/g,
                ""
              )
            )
          }
          placeholder="Enter 11-digit BVN"
        />

      </div>


      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >

        {loading
          ? "Verifying..."
          : "Verify BVN"
        }

        {!loading && (
          <ArrowRight size={19} />
        )}

      </button>

    </form>

  );
};

export default BvnVerification;
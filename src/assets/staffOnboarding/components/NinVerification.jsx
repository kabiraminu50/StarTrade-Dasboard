import React, {
  useRef,
  useState,
} from "react";

import {
  Camera,
  Upload,
  ArrowRight,
} from "lucide-react";

import { verifyNIN } from "../onboardingService";


const NinVerification = ({
  role,
  onSuccess,
  onError,
}) => {

  const fileInputRef = useRef(null);

  const [nin, setNin] =
    useState("");

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  /* =========================================
     IMAGE
  ========================================= */

  const handleImageChange = (event) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };


  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (event) => {

    event.preventDefault();

    onError?.("");


    if (!nin || nin.length !== 11) {

      onError?.(
        "Enter a valid 11-digit NIN."
      );

      return;
    }


    if (!dateOfBirth) {

      onError?.(
        "Date of birth is required."
      );

      return;
    }


    if (!image) {

      onError?.(
        "Please upload a selfie."
      );

      return;
    }


    try {

      setLoading(true);


      const data = await verifyNIN({

        nin,

        date_of_birth:
          dateOfBirth,

        role,

        image,

      });


      onSuccess?.(data);

    } catch (error) {

      onError?.(
        error.response?.data?.message ||
        "NIN verification failed."
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
          STEP 02
        </span>

        <h2>
          Verify Identity
        </h2>

        <p>
          Enter the NIN details and upload
          the person's selfie.
        </p>

      </div>


      {/* NIN */}

      <div className="form-group">

        <label>
          NIN
        </label>

        <input
          type="text"
          inputMode="numeric"
          maxLength={11}
          value={nin}
          onChange={(e) =>
            setNin(
              e.target.value.replace(
                /\D/g,
                ""
              )
            )
          }
          placeholder="Enter 11-digit NIN"
        />

      </div>


      {/* DOB */}

      <div className="form-group">

        <label>
          Date of Birth
        </label>

        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) =>
            setDateOfBirth(
              e.target.value
            )
          }
        />

      </div>


      {/* SELFIE */}

      <div className="form-group">

        <label>
          Selfie
        </label>

        <div
          className="selfie-upload"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >

          {preview ? (

            <img
              src={preview}
              alt="Selfie preview"
            />

          ) : (

            <>

              <Camera size={32} />

              <span>
                Upload selfie
              </span>

              <small>
                Clear face photo required
              </small>

            </>

          )}

        </div>


        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          hidden
          onChange={
            handleImageChange
          }
        />

      </div>


      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >

        {loading
          ? "Verifying..."
          : "Verify NIN"
        }

        {!loading && (
          <ArrowRight size={19} />
        )}

      </button>

    </form>
  );
};

export default NinVerification;
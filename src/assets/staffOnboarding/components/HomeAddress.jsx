import React, {
  useRef,
  useState,
} from "react";

import {
  Upload,
  ArrowRight,
} from "lucide-react";

import {
  submitHomeAddress,
} from "../onboardingService";


const HomeAddress = ({
  onboardingId,
  onSuccess,
  onError,
}) => {

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    state: "",
    lga: "",
    streetAddress: "",
    houseNumber: "",
    homeAddress: "",
    landmark: "",
  });

  const [utilityBill, setUtilityBill] = useState(null);

  const [loading, setLoading] = useState(false);


  /* =========================================
     HANDLE INPUT CHANGE
  ========================================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =========================================
     HANDLE SUBMIT
  ========================================= */

  const handleSubmit = async (event) => {

    event.preventDefault();

    onError?.("");


    /* =========================================
       VALIDATE ONBOARDING ID
    ========================================= */

    if (!onboardingId) {

      onError?.(
        "Onboarding ID is missing."
      );

      return;
    }


    /* =========================================
       VALIDATE UTILITY BILL
    ========================================= */

    if (!utilityBill) {

      onError?.(
        "Utility bill is required."
      );

      return;
    }


    try {

      setLoading(true);


      console.log(
        "SUBMITTING HOME ADDRESS FOR:",
        onboardingId
      );


      /* =========================================
         SUBMIT HOME ADDRESS
      ========================================= */

      const data = await submitHomeAddress({
        onboardingId,
        ...form,
        utilityBill,
      });


      /* =========================================
         SUCCESS
      ========================================= */

      onSuccess?.(data);


    } catch (error) {

      console.error(
        "HOME ADDRESS SUBMISSION ERROR:",
        error.response?.data || error.message
      );


      onError?.(
        error.response?.data?.message ||
        "Failed to save home address."
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

      {/* =========================================
          STEP HEADING
      ========================================= */}

      <div className="step-heading">

        <span className="step-label">
          STEP 04
        </span>

        <h2>
          Home Address
        </h2>

        <p>
          Enter the person's residential
          address.
        </p>

      </div>


      {/* =========================================
          STATE + LGA
      ========================================= */}

      <div className="form-grid">

        <div className="form-group">

          <label>
            State
          </label>

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
          />

        </div>


        <div className="form-group">

          <label>
            LGA
          </label>

          <input
            name="lga"
            value={form.lga}
            onChange={handleChange}
            placeholder="LGA"
          />

        </div>

      </div>


      {/* =========================================
          STREET ADDRESS
      ========================================= */}

      <div className="form-group">

        <label>
          Street Address
        </label>

        <input
          name="streetAddress"
          value={form.streetAddress}
          onChange={handleChange}
          placeholder="Street address"
        />

      </div>


      {/* =========================================
          HOUSE NUMBER
      ========================================= */}

      <div className="form-group">

        <label>
          House Number
        </label>

        <input
          name="houseNumber"
          value={form.houseNumber}
          onChange={handleChange}
          placeholder="House number"
        />

      </div>


      {/* =========================================
          HOME ADDRESS
      ========================================= */}

      <div className="form-group">

        <label>
          Home Address
        </label>

        <textarea
          name="homeAddress"
          value={form.homeAddress}
          onChange={handleChange}
          placeholder="Full home address"
          rows={3}
        />

      </div>


      {/* =========================================
          LANDMARK
      ========================================= */}

      <div className="form-group">

        <label>

          Landmark

          <span className="optional">
            Optional
          </span>

        </label>

        <input
          name="landmark"
          value={form.landmark}
          onChange={handleChange}
          placeholder="Nearby landmark"
        />

      </div>


      {/* =========================================
          UTILITY BILL
      ========================================= */}

      <div className="form-group">

        <label>
          Utility Bill
        </label>

        <div
          className="document-upload"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >

          <Upload size={25} />

          <span>

            {utilityBill
              ? utilityBill.name
              : "Upload utility bill"
            }

          </span>

        </div>


        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          hidden
          onChange={(event) => {

            const file =
              event.target.files?.[0];

            if (file) {
              setUtilityBill(file);
            }

          }}
        />

      </div>


      {/* =========================================
          CONTINUE BUTTON
      ========================================= */}

      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >

        {loading
          ? "Saving..."
          : "Continue"
        }

        {!loading && (
          <ArrowRight size={19} />
        )}

      </button>

    </form>
  );
};


export default HomeAddress;
import React, {
  useState,
} from "react";

import {
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

import {
  submitContactDetails,
} from "../onboardingService";


const ContactDetails = ({
  onboardingId,
  onSuccess,
  onError,
}) => {

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] =
    useState(false);


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


  const handleSubmit = async (event) => {

    event.preventDefault();

    onError?.("");


    try {

      setLoading(true);


      const data =
        await submitContactDetails({

          onboardingId,

          email:
            form.email,

          phoneNumber:
            form.phoneNumber,

        });


      onSuccess?.(data);

    } catch (error) {

      onError?.(
        error.response?.data?.message ||
        "Failed to save contact details."
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
          STEP 05
        </span>

        <h2>
          Contact Details
        </h2>

        <p>
          Enter the person's contact
          information.
        </p>

      </div>


      <div className="form-group">

        <label>
          Email Address
        </label>

        <div className="input-with-icon">

          <Mail size={19} />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />

        </div>

      </div>


      <div className="form-group">

        <label>
          Phone Number
        </label>

        <div className="input-with-icon">

          <Phone size={19} />

          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phoneNumber:
                  e.target.value.replace(
                    /\D/g,
                    ""
                  ),
              }))
            }
            maxLength={11}
            placeholder="08012345678"
          />

        </div>

      </div>


      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >

        {loading
          ? "Sending..."
          : "Complete Onboarding"
        }

        {!loading && (
          <ArrowRight size={19} />
        )}

      </button>

    </form>

  );
};

export default ContactDetails;
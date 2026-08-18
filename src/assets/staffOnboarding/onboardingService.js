import axios from "axios";


const API_URL =
  import.meta.env.VITE_API_URL;


/* =========================================
   AUTH CONFIG
========================================= */

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Authentication token not found."
    );
  }

  return {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },

    withCredentials: true,
  };
};


/* =========================================
   GET ONBOARDING PERMISSIONS
========================================= */

export const getOnboardingPermissions =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/permissions`,
        getAuthConfig()
      );

    return response.data;
  };


/* =========================================
   VERIFY NIN
========================================= */

export const verifyNIN = async ({
  nin,
  date_of_birth,
  role,
  image,
}) => {

  const formData =
    new FormData();

  formData.append(
    "nin",
    nin
  );

  formData.append(
    "date_of_birth",
    date_of_birth
  );

  formData.append(
    "role",
    role
  );

  formData.append(
    "image",
    image
  );


  const response =
    await axios.post(

      `${API_URL}/prembly`,

      formData,

      {
        ...getAuthConfig(),
      }

    );


  return response.data;
};


/* =========================================
   VERIFY BVN
========================================= */

export const verifyBVN = async ({
  onboardingId,
  bvn,
}) => {

  const response =
    await axios.post(

      `${API_URL}/verify-bvn/${onboardingId}`,

      {
        bvn,
      },

      getAuthConfig()

    );


  return response.data;
};


/* =========================================
   HOME ADDRESS
========================================= */

export const submitHomeAddress =
  async ({
    onboardingId,
    state,
    lga,
    streetAddress,
    houseNumber,
    homeAddress,
    landmark,
    utilityBill,
  }) => {

    const formData =
      new FormData();


    formData.append(
      "state",
      state
    );

    formData.append(
      "lga",
      lga
    );

    formData.append(
      "streetAddress",
      streetAddress
    );

    formData.append(
      "houseNumber",
      houseNumber
    );

    formData.append(
      "homeAddress",
      homeAddress
    );

    formData.append(
      "landmark",
      landmark || ""
    );

    formData.append(
      "image",
      utilityBill
    );


    const response =
      await axios.patch(

        `${API_URL}/homeaddressupdate/${onboardingId}`,

        formData,

        getAuthConfig()

      );


    return response.data;
  };


/* =========================================
   CONTACT DETAILS
========================================= */

export const submitContactDetails =
  async ({
    onboardingId,
    email,
    phoneNumber,
  }) => {

    const response =
      await axios.patch(

        `${API_URL}/onboarding/${onboardingId}`,

        {
          email,
          phoneNumber,
        },

        getAuthConfig()

      );


    return response.data;
  };
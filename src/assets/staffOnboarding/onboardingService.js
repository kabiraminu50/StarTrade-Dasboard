import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/* =========================================
   DEBUG
========================================= */

console.log("ONBOARDING API URL:", API_URL);

/* =========================================
   AUTH CONFIG
========================================= */

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
};

/* =========================================
   GET ONBOARDING PERMISSIONS
========================================= */

export const getOnboardingPermissions = async () => {
  const url =
    `${API_URL}/staff-onboarding/permissions`;

  console.log("GET ONBOARDING PERMISSIONS:", url);

  const response = await axios.get(
    url,
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
  const formData = new FormData();

  formData.append("nin", nin);
  formData.append("date_of_birth", date_of_birth);
  formData.append("role", role);
  formData.append("image", image);

  const url =
    `${API_URL}/verifynin/prembly`;

  console.log("VERIFY NIN URL:", url);

  const response = await axios.post(
    url,
    formData,
    getAuthConfig()
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
  const url =
    `${API_URL}/bvn/verify-bvn/${onboardingId}`;

  console.log("VERIFY BVN URL:", url);

  const response = await axios.post(
    url,
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

export const submitHomeAddress = async ({
  onboardingId,
  state,
  lga,
  streetAddress,
  houseNumber,
  homeAddress,
  landmark,
  utilityBill,
}) => {
  const formData = new FormData();

  formData.append("state", state);
  formData.append("lga", lga);
  formData.append("streetAddress", streetAddress);
  formData.append("houseNumber", houseNumber);
  formData.append("homeAddress", homeAddress);
  formData.append("landmark", landmark || "");
  formData.append("image", utilityBill);

  const url =
    `${API_URL}/update/home/homeaddressupdate/${onboardingId}`;

  console.log("HOME ADDRESS URL:", url);

  const response = await axios.patch(
    url,
    formData,
    getAuthConfig()
  );

  return response.data;
};

/* =========================================
   CONTACT DETAILS
========================================= */

export const submitContactDetails = async ({
  onboardingId,
  email,
  phoneNumber,
}) => {
  const url =
    `${API_URL}/update/contactdetails/onboarding/${onboardingId}`;

  console.log("CONTACT DETAILS URL:", url);

  const response = await axios.patch(
    url,
    {
      email,
      phoneNumber,
    },
    getAuthConfig()
  );

  return response.data;
};
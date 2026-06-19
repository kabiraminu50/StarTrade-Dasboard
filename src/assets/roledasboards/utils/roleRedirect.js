export const roleRedirect = (role) => {
  switch (role) {
    case "CUSTOMER":
      return "/customer/dashboard";

    case "BO":
      return "/bo/dashboard";

    case "MARKETER":
      return "/marketer/dashboard";

    case "BRM":
      return "/brm/dashboard";

    case "SC":
      return "/sc/dashboard";

    case "DSA":
      return "/dsa/dashboard";

    case "SA":
      return "dashboard";

    default:
      return "/login";
  }
};
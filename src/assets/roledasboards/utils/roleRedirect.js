export const roleRedirect = (role) => {
  switch (role) {
    case "CUSTOMER":
      return "/customer/dashboard";

    case "BO":
      return "/bo/dashboard";

    case "CRM":
      return "/crm/dashboard";

      case "RM":
      return "/rm/dashboard";

    case "MRM":
      return "/mrm/dashboard";

    case "SC":
      return "/sc/dashboard";

    case "DA":
      return "/da/dashboard";

    case "SA":
      return "/sa/dashboard";

    default:
      return "/login";
  }
};
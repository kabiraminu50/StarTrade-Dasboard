import React from "react";
import {
  UserPlus,
  ArrowRight,
} from "lucide-react";

const ROLE_LABELS = {
  RM: "Relationship Manager",
  MRM: "Master Relationship Manager",
  SC: "Super Coordinator",
  DA: "Delivery Agent",
  CRM: "Customer Relationship Manager",
  BO: "Business Owner",
  CUSTOMER: "Customer",
};


const RoleSelector = ({
  roles = [],
  selectedRole,
  onSelect,
}) => {

  return (
    <section className="role-selector">

      <div className="step-heading">

        <span className="step-label">
          STEP 01
        </span>

        <h2>
          Who are you onboarding?
        </h2>

        <p>
          Select the account type you want
          to create.
        </p>

      </div>


      <div className="role-grid">

        {roles.map((role) => (

          <button
            type="button"
            key={role}
            className={`role-card ${
              selectedRole === role
                ? "active"
                : ""
            }`}
            onClick={() =>
              onSelect(role)
            }
          >

            <div className="role-icon">
              <UserPlus size={24} />
            </div>


            <div className="role-info">

              <h3>
                {ROLE_LABELS[role] || role}
              </h3>

              <p>
                Create {role} account
              </p>

            </div>


            <ArrowRight
              className="role-arrow"
              size={20}
            />

          </button>

        ))}

      </div>

    </section>
  );
};

export default RoleSelector;
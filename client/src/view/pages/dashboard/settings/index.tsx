import React from "react";

import AccountSettings from "./AccountSettings";
import PasswordChange from "./PasswordChange";

function index() {
  return (
    <div className="flex-1">
      <AccountSettings />
      <PasswordChange />
    </div>
  );
}

export default index;

import React from "react";

import AccountSettings from "./AccountSettings";
import PasswordChange from "./PasswordChange";

function index() {
  return (
    <div className="flex-1 ">
      <AccountSettings />
      <hr className=" bg-[#e0e0e0] my-20" />
      <PasswordChange />
    </div>
  );
}

export default index;

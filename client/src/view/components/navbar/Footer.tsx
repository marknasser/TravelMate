import React from "react";
import { BsInstagram, BsTwitter, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <div id="footer">
      <figure>
        <div>ssss</div>
      </figure>

      <div>
        <div className="flex  gap-2">
          <FaFacebook className="text-teal-700 text-2xl" />
          <BsInstagram className="text-red-400 text-2xl" />
          <BsTwitter className="text-blue-400 text-2xl" />
        </div>

        <div>
          <a> </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

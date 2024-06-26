import React from "react";
import { BsInstagram, BsTwitter, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import logoGreen from "../../../assets/logo-green.png";

function Footer() {
  return (
    <div
      id="footer"
      className="flex-col md:flex-row gap-4   flex justify-between  items-center py-5 px-7  lg:py-7 lg:px-10 "
    >
      <figure className="w-28 md:w-36 ">
        <NavLink to={"/"}>
          <img src={logoGreen} alt="" className="w-full h-full" />
        </NavLink>
      </figure>

      <div className="text-[#777] flex flex-col items-center gap-3">
        <div className="flex  gap-2 text-2xl">
          <NavLink to={"/"}>
            <FaFacebook className="text-teal-700 " />
          </NavLink>

          <NavLink to={"/"}>
            <BsInstagram className="text-red-400 " />
          </NavLink>

          <NavLink to={"/"}>
            <BsTwitter className="text-blue-400 " />
          </NavLink>
        </div>

        <div className="flex gap-2 font-normal">
          <NavLink to={"/"}>home</NavLink>
          <NavLink to={"/"}>about</NavLink>
          <NavLink to={"/"}>contact us</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Footer;

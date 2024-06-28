import React from "react";
import { NavLink } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { PiBagBold } from "react-icons/pi";
import { IoIosStarOutline } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa";
import { BsMenuButtonWide } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdOutlineReviews } from "react-icons/md";

import ManageBookings from "../ManageBookings";
import ManageReviews from "../ManageReviews";
import ManageTours from "../ManageTours";
import ManageUsers from "../ManageUsers";

const publicLinks = [];

function SideBar() {
  const checkIsActive = ({ isActive }: any) =>
    `flex justify-start gap-3 items-center py-2 px-10 hover:dashboard_activeLink duration-300 ${
      isActive ? "dashboard_activeLink" : ""
    }`;
  return (
    <div className="gradient-bg-section w-1/4 min-h-full py-10 text-[#fff] text-base font-light uppercase">
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink end to="" className={checkIsActive}>
            <CiSettings />
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="mybookings" className={checkIsActive}>
            <PiBagBold />
            My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="myreviews" className={checkIsActive}>
            <MdOutlineReviews />
            My Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="billing" className={checkIsActive}>
            <FaRegCreditCard />
            Billing
          </NavLink>
        </li>
      </ul>

      <div className="mt-14">
        <h5 className="border-b-2 border-white my-2 mx-10 text-xs pb-1 font-semibold">
          Admin
        </h5>

        <ul className="flex flex-col gap-3">
          <li>
            <NavLink to="managetours" className={checkIsActive}>
              <CiSettings />
              manage tours
            </NavLink>
          </li>
          <li>
            <NavLink to="manageusers" className={checkIsActive}>
              <PiBagBold />
              manage users
            </NavLink>
          </li>
          <li>
            <NavLink to="managereviews" className={checkIsActive}>
              <MdOutlineReviews />
              My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="managebookings" className={checkIsActive}>
              <FaRegCreditCard />
              manage bookings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

import React from "react";

import { NavLink } from "react-router-dom";

import { CiSettings } from "react-icons/ci";
import { PiBagBold } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";
import { BsMenuButtonWide } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";

import ManageBookings from "../ManageBookings";
import ManageReviews from "../ManageReviews";
import ManageTours from "../ManageTours";
import ManageUsers from "../ManageUsers";

import useMediaScreen from "../../../../hooks/useMediaScreen";

function SideBar() {
  const isLessThan = useMediaScreen(700);

  const checkIsActive = ({ isActive }: any) =>
    `flex flex-col xl:flex-row justify-start gap-3 items-center py-2 px-2 xl:px-10 hover:dashboard_activeLink duration-300 ${
      isActive ? "dashboard_activeLink" : ""
    }`;
  return (
    <div className="gradient-bg-section w-fit xl:w-1/4 min-h-full py-10 text-[#fff] text-xs  xl:text-base font-light uppercase">
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink end to="" className={checkIsActive}>
            <CiSettings className="text-2xl" />
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="mybookings" className={checkIsActive}>
            <PiBagBold className="text-2xl" />
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="myreviews" className={checkIsActive}>
            <MdOutlineReviews className="text-2xl" />
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="billing" className={checkIsActive}>
            <FaRegCreditCard className="text-2xl" />
            Billing
          </NavLink>
        </li>
      </ul>

      <div className="mt-14">
        <h5 className="border-b-2 border-white my-2 mx-3 mx-10 text-xs pb-1 font-semibold">
          Admin
        </h5>

        <ul className="flex flex-col gap-3">
          <li>
            <NavLink to="managetours" className={checkIsActive}>
              <CiSettings className="text-2xl" />
              <span> {!isLessThan && "manage"} tours</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="manageusers" className={checkIsActive}>
              <PiBagBold className="text-2xl" />
              {!isLessThan && "manage"} users
            </NavLink>
          </li>
          <li>
            <NavLink to="managereviews" className={checkIsActive}>
              <MdOutlineReviews className="text-2xl" />
              {!isLessThan && "manage"} Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="managebookings" className={checkIsActive}>
              <FaRegCreditCard className="text-2xl" />
              {!isLessThan && "manage"} bookings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

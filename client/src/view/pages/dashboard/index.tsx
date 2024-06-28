import React from "react";

import { Route, Routes } from "react-router-dom";
import DashboardContent from "../../layouts/DashboardContent";
import DashboardLayout from "../../layouts/DashboardLayout";

import SideBar from "./sidebar";

import Settings from "./settings";
import MyBookings from "./MyBookings";
import MyReviews from "./MyReviews";
import NotFound from "../NotFound";
import Billing from "./Billing";
import ManageTours from "./ManageTours";
import ManageUsers from "./ManageUsers";
import ManageReviews from "./ManageReviews";
import ManageBookings from "./ManageBookings";

function index() {
  return (
    <DashboardLayout>
      <SideBar />
      <Routes>
        <Route
          path=""
          element={
            <DashboardContent>
              <Settings />
            </DashboardContent>
          }
        />
        <Route
          path="mybookings"
          element={
            <DashboardContent>
              <MyBookings />
            </DashboardContent>
          }
        />
        <Route
          path="myreviews"
          element={
            <DashboardContent>
              <MyReviews />
            </DashboardContent>
          }
        />
        <Route
          path="billing"
          element={
            <DashboardContent>
              <Billing />
            </DashboardContent>
          }
        />
        <Route
          path="managetours"
          element={
            <DashboardContent>
              <ManageTours />
            </DashboardContent>
          }
        />
        <Route
          path="manageusers"
          element={
            <DashboardContent>
              <ManageUsers />
            </DashboardContent>
          }
        />
        <Route
          path="managereviews"
          element={
            <DashboardContent>
              <ManageReviews />
            </DashboardContent>
          }
        />
        <Route
          path="managebookings"
          element={
            <DashboardContent>
              <ManageBookings />
            </DashboardContent>
          }
        />
        <Route path="*" element={<NotFound onClick={() => {}} />} />
      </Routes>
    </DashboardLayout>
  );
}

export default index;

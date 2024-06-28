import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "../../store/auth/operations";
import { redirect, Navigate } from "react-router-dom";

function AuthLayout({ children }: any) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const isPending = useSelector((state: any) => state.auth.isPending);
  const user = useSelector((state: any) => state.auth.currentUser);

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
}

export default AuthLayout;

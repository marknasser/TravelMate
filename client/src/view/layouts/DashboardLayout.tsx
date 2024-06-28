import React from "react";
import useElementHeight from "../../hooks/useElementHeight";

function DashboardLayout({ children }: any) {
  const headerHeight = useElementHeight("#header");
  const footerHeight = useElementHeight("#footer");

  return (
    <div
      className="flex justify-between items-stretch bg-[#f7f7f7]  w-full lg:p-20 p-5 "
      style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
    >
      {children}
    </div>
  );
}

export default DashboardLayout;

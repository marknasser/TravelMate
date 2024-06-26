import React from "react";
import useElementHeight from "../../hooks/useElementHeight";

function BaseContainer({ children }: any) {
  const headerHeight = useElementHeight("#header");
  const footerHeight = useElementHeight("#footer");
  return (
    <div
      className="flex justify-center items-center bg-[#f7f7f7]"
      style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
    >
      {children}
    </div>
  );
}

export default BaseContainer;

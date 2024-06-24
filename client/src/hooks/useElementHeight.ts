import { useState, useEffect } from "react";

interface useElementHeightProps {
  query: string;
}

const useElementHeight = (query: string) => {
  const [height, setHeight] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      const navBar = document.querySelector(query);
      if (navBar) {
        setHeight(navBar.clientHeight);
      }
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return height;
};

export default useElementHeight;

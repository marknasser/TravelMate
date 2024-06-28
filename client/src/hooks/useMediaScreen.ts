import { useState, useEffect } from "react";

interface useMediaScreenProps {
  screenWidth: number;
}

const useMediaScreen = (screenWidth: number) => {
  const [isLessThan, setIsLessThan] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < screenWidth) {
        setIsLessThan(true);
      } else {
        setIsLessThan(false);
      }
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isLessThan;
};

export default useMediaScreen;

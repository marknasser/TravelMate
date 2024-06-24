import React from "react";

import Button from "../../components/form/Button";

interface BookNowProps {
  gallery: string[];
}

const BookNow: React.FC<BookNowProps> = ({ gallery }) => {
  return (
    <div className="bg-[#f7f7f7] w-full  h-[300px] flex justify-center items-center">
      <div className="bg-white w-4/5 flex justify-between items-center px-6 py-12 rounded-2xl ">
        <div>imgs</div>
        <div>
          <h3 className="uppercase heading-secondary text-sm">
            WHAT ARE YOU WAITING FOR?
          </h3>
          <p className="text-[#777] font-light text-xl">
            3 days. 1 adventure. Infinite memories. Make it yours today!
          </p>
        </div>
        <Button text="book tour now!" extraStyle="font-medium" />
      </div>
    </div>
  );
};

export default BookNow;

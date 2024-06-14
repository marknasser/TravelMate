import React from "react";
import { LuClock4 } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";

interface DetailsHeaderProps {
  imageCover: string;
  name: string;
  startLocationDescription: string;
  duration: number;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  imageCover,
  name,
  startLocationDescription,
  duration,
}) => {
  return (
    <div className="bg-slate-600 h-[600px] relative">
      <img
        src={`http://127.0.0.1:8000/img/tours/${imageCover}`}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className=" absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 text-white z-30 flex justify-between items-center flex-col">
        <h1 className=" text-xl sm:text-3xl lg:text-6xl  p-4 w-fit z-40 text-white bg-gradient-to-br-custom">
          {name}
        </h1>
        {/* <h1 className="heading-primary">{name}</h1> */}
        <div className="flex justify-center items-center gap-8  uppercase text-lg font-semibold mt-7">
          <div className=" flex items-center justify-start gap-3 mb-4 ">
            <LuClock4 />
            <span className="text-sm lg:text-base">{duration} days</span>
          </div>
          <div className=" flex items-center justify-start gap-3 mb-4 ">
            <IoLocationOutline />
            <span className="text-sm lg:text-base">
              {startLocationDescription}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-full bg-[#7dd56f] opacity-80 absolute z-10 top-0 left-0"></div>
    </div>
  );
};

export default DetailsHeader;

import React from "react";
import { BaseTour } from "../../types/general";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CiFlag1 } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

interface TourCardProps {
  data: BaseTour;
}

const TourCard: React.FC<TourCardProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[350px] ">
      <div className="relative h-64">
        <img
          src={`http://127.0.0.1:8000/img/tours/${data.imageCover}`}
          alt=""
          className="w-full h-full object-cover"
        />
        <p className="text-xl absolute bottom-0 right-0 p-4 w-fit z-40 text-white bg-gradient-to-br-custom">
          {data.name}
        </p>
        <div className="w-full h-full bg-[#7dd56f] opacity-30 absolute z-10 top-0 left-0"></div>
      </div>
      <div className="p-6 text-[#777] min-h-[60px] max-h-[60px]:">
        <p className="uppercase font-bold">{`${data.difficulty} ${data.duration}-day tour`}</p>
        <p className="line-clamp-1">{data.summary}</p>
      </div>
      <div className="p-6 flex justify-center flex-wrap text-[#777]">
        <div className="w-2/4 flex items-center justify-start gap-3 mb-4 text-lg">
          <IoLocationOutline className="text-3xl text-[#55c57a]" />
          <span className="text-sm"> {data.startLocation.description}</span>
        </div>
        <div className="w-2/4 flex items-center justify-start gap-3 mb-4 text-lg">
          <SlCalender className="text-3xl text-[#55c57a]" />
          <span className="text-sm">
            {new Date(data.startDates[0]).toLocaleString("en-us", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="w-2/4 flex items-center justify-start gap-3 mb-4 text-lg">
          <CiFlag1 className="text-3xl text-[#55c57a]" />
          <span className="text-sm">
            {" "}
            {`${data.locations.length + 1} stops`}
          </span>
        </div>
        <div className="w-2/4 flex items-center justify-start gap-3 mb-4 text-lg">
          <MdOutlinePersonOutline className="text-3xl text-[#55c57a]" />
          <span className="text-sm">{`${data.maxGroupSize} people`}</span>
        </div>
      </div>
      <div className="bg-[#f7f7f7]  flex justify-between p-6">
        <div className="text-[#777]">
          <div>
            <span className="font-bold">${data.price}</span>
            <span>per person</span>
          </div>
          <div>
            <span className="font-bold">${data.ratingsAverage}</span>
            {`rating (${data.ratingsQuantity})`}
          </div>
        </div>
        <button
          onClick={() => navigate(`/tour/${data._id}`)}
          className="block px-4 rounded-full uppercase w-fit bg-[#55c57a] text-white"
        >
          details
        </button>
      </div>
    </div>
  );
};

export default TourCard;

import React from "react";
import { BaseTour } from "../../types/general";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CiFlag1 } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

import Button from "./form/Button";
import { IconType } from "react-icons";

interface TourCardProps {
  data: BaseTour;
}

const TourCard: React.FC<TourCardProps> = ({ data }) => {
  const navigate = useNavigate();

  const cardStatsData = [
    { Icon: IoLocationOutline, info: data.startLocation.description },
    {
      Icon: SlCalender,
      info: new Date(data.startDates[0]).toLocaleString("en-us", {
        month: "long",
        year: "numeric",
      }),
    },
    { Icon: CiFlag1, info: `${data.locations.length + 1} stops` },
    { Icon: MdOutlinePersonOutline, info: `${data.maxGroupSize} people` },
  ];
  return (
    <div className="w-[350px] shadow-sm bg-white rounded-md overflow-hidden">
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
        {cardStatsData.map((stat, index) => (
          <TourCardStats key={index} Icon={stat.Icon} info={stat.info} />
        ))}
      </div>

      <div className="bg-[#f7f7f7]  flex justify-between p-6 border-t-slate-300">
        <div className="text-[#777]">
          <div>
            <span className="font-bold mr-1">${data.price}</span>
            <span>per person</span>
          </div>
          <div>
            <span className="font-bold mr-1">${data.ratingsAverage}</span>
            {`rating (${data.ratingsQuantity})`}
          </div>
        </div>
        <Button
          text="details"
          onClick={() => navigate(`/tour/${data._id}`)}
          bgColor="#55c57a"
        />
      </div>
    </div>
  );
};

export default TourCard;

interface TourCardStatsProps {
  Icon: IconType;
  info: string;
}

export const TourCardStats: React.FC<TourCardStatsProps> = ({ Icon, info }) => {
  return (
    <div className="w-2/4 flex items-center justify-start gap-3 mb-4 text-lg">
      <Icon className="text-xl text-[#55c57a]" />
      <span className="text-sm"> {info}</span>
    </div>
  );
};

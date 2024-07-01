import React from "react";
import { UserTour } from "../../../../types/general";
import { TourDifficulty, UserRoles } from "../../../../types/enum";

import DetailStatsBoxInfo from "./DetailStatsBoxInfo";

import { CiCalendar } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";

const icons = [
  <CiCalendar className="text-accent-100 font-bold text-2xl" />,
  <TfiStatsUp className="text-accent-100 font-bold text-2xl" />,
  <MdOutlinePersonOutline className="text-accent-100 font-bold text-2xl" />,
  <IoMdStarOutline className="text-accent-100 font-bold text-2xl" />,
];
const staticMiddleText = ["next fate", "difficulty", "paricipants", "rating"];

interface DetailStatsBoxProps {
  title: string;

  guides?: UserTour[];

  startDate?: string;
  difficulty?: TourDifficulty;
  maxGroupSize?: number;
  ratingsAverage?: number;
}

const DetailStatsBox: React.FC<DetailStatsBoxProps> = ({
  title,
  difficulty,
  guides,
  maxGroupSize,
  ratingsAverage,
  startDate,
}) => {
  const renderBoxInfo = () => {
    if (guides) {
      return guides.map((guid, i) => {
        return (
          <DetailStatsBoxInfo
            key={i + 1}
            element={
              <figure className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/img/users/${guid.photo}`}
                  alt=""
                  className="w-full object-cover"
                />
              </figure>
            }
            middleText={
              guid.role === UserRoles.LEAD_GUIDE ? "LEAD GUIDE" : "TOUR GUIDE"
            }
            info={guid.name}
          />
        );
      });
    } else {
      return icons.map((icon, i) => {
        const statsInfo = [
          new Date(startDate).toLocaleString("en-us", {
            month: "long",
            year: "numeric",
          }),
          difficulty,
          maxGroupSize,
          ratingsAverage,
        ];
        return (
          <DetailStatsBoxInfo
            key={i + 1}
            element={icon}
            middleText={staticMiddleText[i]}
            info={statsInfo[i]}
          />
        );
      });
    }
  };

  return (
    <div>
      <h2 className="heading-secondary mb-11">{title}</h2>
      {renderBoxInfo()}
    </div>
  );
};

export default DetailStatsBox;

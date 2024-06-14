import React from "react";

import DetailStatsBox from "./DetailStatsBox";

import { UserTour } from "../../../../types/general";
import { TourDifficulty } from "../../../../types/enum";

interface DetailStatsProps {
  name: string;
  description: string;

  guids: UserTour[];

  startDates: string[];
  difficulty: TourDifficulty;
  maxGroupSize: number;
  ratingsAverage: number;
}

function DetailStats({
  name,
  description,
  difficulty,
  guids,
  maxGroupSize,
  ratingsAverage,
  startDates,
}: DetailStatsProps) {
  return (
    <div className="flex justify-between items-center lg:flex-row flex-col">
      <div className="lg:w-1/2 flex justify-center items-start flex-col gap-12 lg:p-36 p-24 bg-[#f7f7f7]">
        <DetailStatsBox
          title="quick facts"
          maxGroupSize={maxGroupSize}
          ratingsAverage={ratingsAverage}
          startDate={startDates[0]}
          difficulty={difficulty}
        />
        <DetailStatsBox title="your tour guides" guids={guids} />
      </div>
      <div className="lg:w-1/2 flex justify-center items-center flex-col lg:p-36 p-24">
        <h2 className="heading-secondary mb-11">{`About ${name} tour`}</h2>
        <p className="text-[#777] font-light ">{description}</p>
      </div>
    </div>
  );
}

export default DetailStats;

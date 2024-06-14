import React from "react";

interface DetailStatsBoxInfoProps {
  element: React.ReactNode; // or React.ReactElement if you want a stricter type
  middleText: string;
  info: string | number;
}

const DetailStatsBoxInfo: React.FC<DetailStatsBoxInfoProps> = ({
  element,
  info,
  middleText,
}) => {
  return (
    <div className="flex justify-start items-center gap-5 text-[#777] mb-8">
      {element}
      <span className="font-bold uppercase text-base">{middleText}</span>
      <span className="font-light text-base">{info}</span>
    </div>
  );
};

export default DetailStatsBoxInfo;

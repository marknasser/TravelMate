import React from "react";
import Button from "../components/form/Button";
import BaseContainer from "../layouts/BaseContainer";

interface NotFoundProps {
  message?: string;
  onClick: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({
  onClick = () => {},
  message = "Something went wrong",
}) => {
  return (
    <BaseContainer>
      <div className=" bg-white flex justify-between items-center flex-col py-16 px-20 gap-4 shadow-lg rounded-xl">
        <h1 className="heading-secondary mb-5">{message}</h1>
        <Button text="Refresh" onClick={onClick} />
      </div>
    </BaseContainer>
  );
};

export default NotFound;

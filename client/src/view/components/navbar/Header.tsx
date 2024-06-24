import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-white.png";
import Button from "../form/Button";

function Header() {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-between items-center bg-[#444] text-white p-4  text-xl px-6 "
      id="header"
    >
      <div
        className="text-xs sm:text-sm  lg:text-lg cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        All Toures
      </div>
      <img src={logo} alt="sdsd" className="w-8 sm:w-12 lg:w-16" />
      <div className="flex justify-between items-center gap-3 text-xs sm:text-sm  lg:text-base  ">
        <Button
          text="log in"
          bgColor="transparent"
          onClick={() => {
            navigate("/login");
          }}
        />

        <Button
          text="sign up"
          bgColor="transparent"
          onClick={() => {
            navigate("/signup");
          }}
          border={true}
        />
      </div>
    </div>
  );
}

export default Header;

import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-white.png";
import Button from "../form/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/operations";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const isPending = useSelector((state: any) => state.auth.isPending);
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

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
      <img src={logo} alt="logo" className="w-8 sm:w-12 lg:w-16" />
      {!isLoggedIn ? (
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
      ) : (
        <div className="flex justify-between items-center gap-3 text-xs sm:text-sm  lg:text-base  ">
          <Button
            text="LOG OUT"
            bgColor="transparent"
            onClick={logoutHandler}
          />

          <button
            className="flex justify-between items-center gap-2 text-[#fff]"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <figure className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/img/users/${currentUser.photo}`}
                alt=""
              />
            </figure>
            <span>{currentUser.name.split(" ")[0]}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;

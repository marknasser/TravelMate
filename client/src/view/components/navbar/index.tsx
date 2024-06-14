import logo from "../../../assets/logo-white.png";

function index() {
  return (
    <div className="flex justify-between items-center bg-[#444] text-white p-4  text-xl px-6 h-16 sm:h-24">
      <div className="text-xs sm:text-sm  lg:text-lg">All Toures</div>
      <img src={logo} alt="sdsd" className="w-8 sm:w-12 lg:w-16" />
      <div className="flex justify-between items-center gap-7 text-xs sm:text-sm  lg:text-lg ">
        <div>LOG IN</div>
        <div className="border p-2 px-4 rounded-3xl">SIGN UP</div>
      </div>
    </div>
  );
}

export default index;

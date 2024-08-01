import { Scene } from "layout/Scene";
import { SideBar } from "layout/SideBar";
const Config3d = () => {
  return (
    <div className="border-box flex h-screen w-full flex-col overflow-y-auto pb-6 font-inter text-[#4A4A4F] md:h-auto md:flex-row md:overflow-hidden md:p-0">
      <div className="px-5 py-5 md:hidden">
        <h1 className="mb-3.5 text-[16.8px] xs:text-[28px]">
          Design Your Metal Building
        </h1>
        <span className="text-[14px] font-thin xs:text-[1.7rem]">
          Bring your dreams to reality
        </span>
      </div>
      <div className="sticky top-0 w-full md:w-1/2">
        <Scene />
      </div>
      <div className="w-full md:w-1/2">
        <SideBar />
      </div>
    </div>
  );
};

export default Config3d;

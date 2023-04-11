import React from "react";
import { Helmet } from "react-helmet-async";

import Menu from "../../components/Menu";
import BarChart from "./components/BarChart";

function Overview() {
  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div className=" w-full mx-auto md:ml-52 lg:ml-72">
        <div className="mt-20 flex flex-row flex-wrap w-full">
          <div className="flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 from-[#FCC49C] to-[#EE9554] shadow-[#EE9554] shadow-md w-[43%] max-w-[180px]">
            <h4 className="flex flex-col text-white ml-4">
              Nya inlägg <span>10</span>
            </h4>
          </div>
          <div className="flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 from-secondary to-primary w-[43%] max-w-[180px] shadow-secondary shadow-md">
            <h4 className="flex flex-col text-white ml-4">
              Antal inlägg <span>50</span>
            </h4>
          </div>
          <div className="flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 from-accent to-accentHover w-[43%] max-w-[180px] shadow-accentHover shadow-md">
            <h4 className="flex flex-col text-white ml-4">
              Antal <span>2</span>
            </h4>
          </div>
        </div>

        <div className="max-w-[572px] mt-10 sm:mt-20 mx-[8px]">
          <BarChart />
        </div>
      </div>
    </div>
  );
}
export default Overview;

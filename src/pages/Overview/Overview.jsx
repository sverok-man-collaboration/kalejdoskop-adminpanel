import React from "react";
import { Helmet } from "react-helmet-async";

import Menu from "../../components/Menu";

function Overview() {
  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div>
        <div className="mt-20 flex flex-row justify-center">
          <div className="flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 from-[#FCC49C] to-[#EE9554] shadow-[#EE9554] shadow-md w-[180px]">
            <h4 className="flex flex-col text-white ml-4">
              Nya inlägg <span>10</span>
            </h4>
          </div>
          <div className="flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 from-secondary to-primary w-[180px] shadow-secondary shadow-md">
            <h4 className="flex flex-col text-white ml-4">
              Antal inlägg <span>50</span>
            </h4>
          </div>
          <div className="flex items-center h-[110px] pb-2 bg-gradient-to-r m-2 from-accent to-accentHover w-[180px] shadow-accentHover shadow-md">
            <h4 className="flex flex-col text-white ml-4">
              Antal <span>2</span>
            </h4>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border w-[570px] h-60 pl-4 pt-4 mt-20">
            <h4>Diagram</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Overview;

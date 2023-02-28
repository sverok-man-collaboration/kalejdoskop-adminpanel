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
    </div>
  );
}
export default Overview;

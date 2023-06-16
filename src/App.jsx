import React from "react";
import BarLoader from "react-spinners/BarLoader";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <BarLoader />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;

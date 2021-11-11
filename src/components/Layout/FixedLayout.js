import React, { useState } from "react";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

const FixedLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <AppBar
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Drawer
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );
};

export default FixedLayout;

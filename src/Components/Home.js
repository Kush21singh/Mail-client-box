import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState, Fragment } from "react";
import ComposeMail from "./ComposeMail";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <div style={{ display: "flex" }}>
        <SideBar />
        <ComposeMail />
      </div>
    </Fragment>
  );
};

export default Home;
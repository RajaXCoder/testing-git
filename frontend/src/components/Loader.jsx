import React from "react";
import { DotLoader } from "react-spinners";

const Loader = () => (
  <div className="h-[90vh] flex justify-center items-center">
    <DotLoader size={60} color="#00ffcc" />
  </div>
);

export default Loader;

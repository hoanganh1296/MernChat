import React from "react";
import "./loading.css";
import loadingImg from "./loading.gif";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <img src={loadingImg} alt="loading" />
    </div>
  );
};

export default Loading;

import React from "react";
import "./loadingDialog.css";
import animationData from "../../../assets/lotties/loading.json";
import { Trans } from "react-i18next";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const LoadingDialog = (props) => {
  return (
    <div className="loading-dialog">
      <div className="loading-dialog-title">
        <Trans>Please Wait a moment</Trans>
      </div>
    </div>
  );
};
export default LoadingDialog;

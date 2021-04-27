import React from "react";
import "../style/statusColor.css";

function statusColor(props) {
  const status = props.status;
  if (status === "alive") {
    return <div className="alive"></div>;
  }
  return <div className="dead"></div>;
}
export default statusColor;

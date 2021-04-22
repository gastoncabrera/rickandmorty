import React from "react";
import "../style/statusColor.css";

function statusColor(props) {
  const status = props.status;
  if (status === "Alive") {
    return <div className="Alive"></div>;
  }
  return <div className="Dead"></div>;
}
export default statusColor;

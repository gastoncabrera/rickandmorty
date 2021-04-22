import { render } from "@testing-library/react";
import React from "react";
import "../style/Loader.css";

class Loader extends React.Component {
  render() {
    return (
      <div className="loader-animation">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
export default Loader;

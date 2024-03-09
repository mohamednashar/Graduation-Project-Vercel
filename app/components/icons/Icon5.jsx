import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

function Icon5({ fill }) {
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center`}
      style={{ color: fill }}
    >
      <FontAwesomeIcon icon={faBuildingFlag} />
    </div>
  );
}

export default Icon5;

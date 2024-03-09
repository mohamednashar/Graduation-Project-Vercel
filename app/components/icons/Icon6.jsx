import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

function Icon6({ fill }) {
  return (
    <div
    className={`w-5 h-5 flex items-center justify-center`}
    style={{ color: fill }}
  >
      <FontAwesomeIcon icon={faPeopleGroup} />
    </div>
  );
}

export default Icon6;

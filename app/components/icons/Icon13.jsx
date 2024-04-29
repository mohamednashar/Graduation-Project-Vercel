import {  faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon12({ fill }) {
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center`}
      style={{ color: fill }}
    >
<FontAwesomeIcon icon={faPeopleLine} />    </div>
  );
}

export default Icon12;

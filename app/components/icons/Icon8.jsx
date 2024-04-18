import { faBuildingColumns, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon8({ fill }) {
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center`}
      style={{ color: fill }}
    >
<FontAwesomeIcon icon={faBuildingColumns} />    </div>
  );
}

export default Icon8;

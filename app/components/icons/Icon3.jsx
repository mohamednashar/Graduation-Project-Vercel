import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon3({ fill }) {
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center`}
      style={{ color: fill }}
    >
      <FontAwesomeIcon icon={faUserGraduate} />
    </div>
  );
}

export default Icon3;

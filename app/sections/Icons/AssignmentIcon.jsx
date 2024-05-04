import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AssignmentIcon({ fill }) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center`}
      style={{ color: fill }}
    >
      <FontAwesomeIcon icon={faFileLines} />{" "}
    </div>
  );
}

export default AssignmentIcon;

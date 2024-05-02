import {  faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function QuizIcon({ fill }) {
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center`}
      style={{ color: fill }}
    >
<FontAwesomeIcon icon={faPenRuler} />    </div>
  );
}

export default QuizIcon;

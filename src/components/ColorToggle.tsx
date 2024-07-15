import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

type ItemProps = {
  name: string;
  tailwindColor: string;
  visibles: string;
  onClick: () => void;
};

export default function Project(props: ItemProps) {
  return (
    <button
      className="flex items-center w-full text-sm text-gray-600 hover:text-gray-500 active:text-gray-400 rounded-md py-2 transition-all"
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        icon={props.visibles.includes(props.name) ? faCircleCheck : faCircle}
        className="mr-2"
      />
      <span>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</span>
    </button>
  );
}

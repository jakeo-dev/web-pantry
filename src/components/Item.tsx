import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type ItemProps = {
  id: number;
  name: string;
  desc: string;
  link: string;
  color: string;
  visible: boolean;
  onEdit: () => void;
  onTrash: () => void;
};

export default function Project(props: ItemProps) {
  return (
    <div
      className={`${
        props.visible ? "" : "hidden"
      } md:border-b-4 border-b-[#5d4037] pb-6 md:mb-16 px-3`}
    >
      <a
        href={props.link}
        className={`item block relative min-h-40 ${props.color} text-white rounded-3xl shadow-md active:shadow-none transition-all px-6 pt-4 pb-8`}
        target="_blank"
      >
        <span className="text-xl break-words font-medium">{props.name}</span>
        <span className="block break-words mt-1">{props.desc}</span>
        <span className="absolute bottom-0 left-0 text-white/70 text-xs break-all pb-3 pl-5">
          <FontAwesomeIcon icon={faLink} className="mr-1" />
          {props.link.length < 80
            ? props.link.replace("http://", "").replace("https://", "")
            : props.link
                .replace("http://", "")
                .replace("https://", "")
                .substring(0, 79) + "..."}
        </span>

        <div className="optDiv md:opacity-0 flex absolute bottom-0 right-0 gap-3 pb-3 pr-5 transition-all">
          <button
            onClick={(e) => {
              props.onEdit?.(); // literally no idea what ?.() is doing, apparently it "Calls props.onEdit if it exists"????? idk but ai is great
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon
              icon={faPen}
              className="text-xl text-white/50 hover:text-white/70 active:text-white/90 transition-all"
            />
          </button>
          <button
            onClick={(e) => {
              props.onTrash?.(); // literally no idea what ?.() is doing, apparently it "Calls props.onEdit if it exists"????? idk but ai is great
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="text-xl text-white/50 hover:text-white/70 active:text-white/90 transition-all"
            />
          </button>
        </div>
      </a>
    </div>
  );
}

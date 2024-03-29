import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type ItemProps = {
  id: number;
  name: string;
  desc: string;
  link: string;
  color: string;
  visibles: string;
  search: string;
  view: number;
  onEdit: () => void;
  onTrash: () => void;
};

export default function Project(props: ItemProps) {
  return (
    <div
      className={`${props.visibles.includes(props.color) ? "" : "hidden"} ${
        props.name
          .replaceAll(/ /g, "")
          .toLowerCase()
          .includes(props.search.replaceAll(/ /g, "").toLowerCase()) ||
        props.desc
          .replaceAll(/ /g, "")
          .toLowerCase()
          .includes(props.search.replaceAll(/ /g, "").toLowerCase()) ||
        props.link
          .replaceAll(/ /g, "")
          .toLowerCase()
          .includes(props.search.replaceAll(/ /g, "").toLowerCase())
          ? ""
          : "hidden"
      } h-full`}
    >
      <a
        href={props.link}
        className={`${
          props.view == 0
            ? "min-h-40 rounded-3xl px-7 pt-5 pb-12"
            : "rounded-xl px-5 py-3.5 pb-9"
        } ${
          props.color
        } item block relative h-full text-white shadow-md active:shadow-none transition-all`}
        target="_blank"
      >
        <span
          className={`${
            props.view == 0 ? "text-xl" : "text-lg leading-6"
          } break-words font-medium`}
        >
          {props.name}
        </span>
        <span
          className={`text-white/90 ${
            props.view == 0 ? "block" : "leading-6 pl-2.5"
          } break-words mt-1`}
        >
          {props.desc}
        </span>
        <span
          className={`text-white/70 text-xs break-all absolute bottom-0 left-0 ${
            props.view == 0 ? "px-7 pb-5" : "px-5 pb-3.5"
          } max-w-full truncate`}
        >
          <FontAwesomeIcon icon={faLink} className="mr-1" />
          {props.link.replace("http://", "").replace("https://", "")}
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

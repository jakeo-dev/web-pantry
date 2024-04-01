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
    // pomegranate-text apricot-text banana-text lime-text kiwi-text blueberry-text huckleberry-text grape-text dragonfruit-text blackberry-text
    // ^^^ YOU NEED TO KEEP THIS COMMENT HERE IN ORDER FOR THE COLORED TEXT TO WORK. I HAVE LITERALLY NO IDEA WHY. JUST KEEP IT HERE.
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
            ? props.color +
              "-text border-t-[1.5px] border-gray-300 hover:bg-gray-300/50 active:bg-gray-400/30 px-3 py-2.5 pr-20"
            : props.color +
              " rounded-xl shadow-md active:shadow-none px-6 py-5 pb-12"
        } item block relative h-full transition-all`}
        target="_blank"
      >
        <span
          className={`${
            props.view == 0 ? "text-lg pr-3" : "text-xl leading-6"
          } break-words font-medium`}
        >
          {props.name}
        </span>
        <span
          className={`${
            props.view == 0
              ? "text-black/90 pr-3"
              : "block text-white/90 leading-6"
          } ${props.desc == "" ? "hidden" : ""} break-words mt-1`}
        >
          {props.desc}
        </span>
        <span
          className={`text-xs break-all ${
            props.view == 0
              ? "text-black/70"
              : "text-white/70 max-w-full truncate px-6 pb-5 absolute bottom-0 left-0"
          }`}
        >
          <FontAwesomeIcon icon={faLink} className="mr-1" />
          {props.view == 0 && props.link.length > 79
            ? props.link
                .replace("http://", "")
                .replace("https://", "")
                .substring(0, 79) + "..."
            : props.link.replace("http://", "").replace("https://", "")}
        </span>

        <div
          className={`optDiv md:opacity-0 flex absolute bottom-0 right-0 gap-3 ${
            props.view == 0 ? "pb-2.5" : "pb-3"
          } pr-5 transition-all`}
        >
          <button
            onClick={(e) => {
              props.onEdit?.(); // literally no idea what ?.() is doing, apparently it "Calls props.onEdit if it exists"????? idk but ai is great
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon
              icon={faPen}
              className={`text-xl ${
                props.view == 0
                  ? "text-black/30 hover:text-black/50 active:text-black/70"
                  : "text-white/50 hover:text-white/70 active:text-white/90"
              } transition-all`}
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
              className={`text-xl ${
                props.view == 0
                  ? "text-black/30 hover:text-black/50 active:text-black/70"
                  : "text-white/50 hover:text-white/70 active:text-white/90"
              } transition-all`}
            />
          </button>
        </div>
      </a>
    </div>
  );
}

import { useState, useEffect } from "react";

import Head from "next/head";
import Item from "../components/Item";
import ColorToggle from "../components/ColorToggle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faChevronDown,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// to-do
// folders? tags?
// share pantry
// re-arrange items in pantry

export default function Home() {
  const [itemId, setItemId] = useState(3);

  const colors = [
    "pomegranate",
    "apricot",
    "banana",
    "lime",
    "kiwi",
    "blueberry",
    "huckleberry",
    "plum",
    "grape",
    "dragonfruit",
    "blackberry",
  ];

  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [colorInput, setColorInput] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const [addModalVis, setAddModalVis] = useState("fadeIn");
  const [editModalVis, setEditModalVis] = useState("fadeIn");

  const [viewType, setViewType] = useState(0);

  const [optionsVis, setOptionsVis] = useState(false);
  colors[Math.floor(Math.random() * colors.length)];
  const [visibles, setVisibles] = useState(colors.toString());
  const [searchInput, setSearchInput] = useState("");

  const [selectedItem, setSelectedItem] = useState({
    id: -1,
    name: "",
    desc: "",
    link: "",
    color: "",
  });

  interface Item {
    // define the type of item
    id: number;
    name: string;
    desc: string;
    link: string;
    color: string;
  }

  const [items, setItems] = useState<Item[]>([
    /* {
      id: 0,
      name: "How to Center in CSS",
      desc: "im very bad at aligning elements",
      link: "http://howtocenterincss.com",
      color: "blueberry",
    },
    {
      id: 1,
      name: "Amazing Tailwind UI things",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
      link: "https://tailwindui.com",
      color: "blueberry",
    },
    {
      id: 2,
      name: "JakeO.dev",
      desc: "check out all my projects and blog posts",
      link: "http://jakeo.dev",
      color: "banana",
    }, */
  ] as Item[]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("pantry") || "[]") as Item[]);
    setViewType((Number(localStorage.getItem("viewType")) || 0) as number);
  }, []);

  function isURL(s: string) {
    return /^((http:\/\/)|(https:\/\/)).+\..+/g.test(s);
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://bunnies.jakeo.dev/images/solid-gradient-blue-black-bunny.png"
          rel="shortcut icon"
          type="image/ico"
        />
        <title>Web Pantry</title>
        <meta property="og:title" content="Web Pantry" />
        <meta property="og:description" content="web pantry!!!!" />
        <meta name="theme-color" content="#83b5d3" />
        <meta
          property="og:image"
          content="https://bunnies.jakeo.dev/images/solid-gradient-blue-black-bunny.png"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cutive&display=swap"
        />
      </Head>

      <div className="flex items-end px-6 md:px-8 mb-3 md:mb-4">
        <h1 className="font-cutive text-3xl md:text-4xl font-bold text-gray-700">
          Web Pantry
          {/* webmarks, webfruits, web fridge, webository */}
        </h1>
        <div className="flex md:hidden gap-2 md:gap-4 ml-auto">
          <button
            className="w-max hover:text-gray-700 hover:underline"
            onClick={() => {
              if (optionsVis) setOptionsVis(false);
              else if (!optionsVis) setOptionsVis(true);
            }}
          >
            Options
            <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </button>
        </div>
      </div>

      <div className="flex text-white gap-8">
        <div className="flex-1 bg-gray-600 shadow-md rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 lg:p-16">
          <div
            className={`${
              viewType == 0
                ? "lg:grid-cols-2 xl:grid-cols-3 md:gap-x-6 gap-y-6 items-end"
                : "lg:grid-cols-2 md:gap-x-3 gap-y-3 items-stretch"
            } grid grid-cols-1`}
          >
            {items.map((item: Item) => (
              <Item
                id={item.id}
                name={item.name}
                desc={item.desc}
                link={item.link}
                color={item.color}
                visibles={visibles}
                search={searchInput}
                view={viewType}
                onEdit={() => {
                  setEditModalVis("fadeOut");
                  setSelectedItem(item);
                  setNameInput(item.name);
                  setDescInput(item.desc);
                  setLinkInput(item.link);
                  setColorInput(item.color);
                }}
                onTrash={() => {
                  if (confirm("Delete " + item.name + "?")) {
                    const updatedItems = [...items];
                    updatedItems.splice(items.indexOf(item), 1);
                    setItems(updatedItems);

                    localStorage.setItem(
                      "pantry",
                      JSON.stringify(updatedItems)
                    );
                  }
                }}
              />
            ))}

            <div className="h-full">
              <button
                className={`${
                  viewType == 0
                    ? "border-8 rounded-3xl"
                    : "border-4 rounded-xl py-3"
                } w-full h-32 md:h-full flex items-center border-gray-100 hover:bg-gray-100 active:bg-gray-200 active:border-gray-200 text-gray-100 hover:text-gray-600 active:text-gray-600 shadow-md active:shadow-none mx-auto transition-all`}
                onClick={() => {
                  setColorInput(
                    colors[Math.floor(Math.random() * colors.length)]
                  );
                  setAddModalVis("fadeOut");
                }}
              >
                <div className="flex items-center mx-auto">
                  <FontAwesomeIcon
                    icon={faAdd}
                    className={viewType == 0 ? "text-5xl" : "text-3xl"}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            optionsVis ? "block" : "hidden"
          } md:block md:flex-[0.2] h-min absolute top-30 right-3 md:static border-2 border-gray-400 md:border-0 bg-gray-600 shadow-md rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 lg:p-16`}
        >
          <h6 className="text-sm text-gray-300 mb-1">View type</h6>
          <button
            className="w-full text-left border-2 border-gray-500 hover:bg-gray-500 active:bg-gray-400 active:border-gray-400 rounded-md px-4 py-2 transition-all"
            onClick={() => {
              if (viewType == 0) {
                setViewType(1);
                localStorage.setItem("viewType", "1");
              } else if (viewType == 1) {
                setViewType(0);
                localStorage.setItem("viewType", "0");
              }
            }}
          >
            <span>{viewType == 0 ? " Cards" : " List"}</span>
          </button>

          <h6 className="text-sm text-gray-300 mb-1 mt-8">Filter items</h6>
          <div>
            <input
              type="text"
              placeholder="Search items..."
              className="flex items-center w-full border-2 border-gray-500 bg-gray-600 hover:bg-gray-500 focus:bg-gray-500 rounded-md px-4 py-2 mb-1 transition-all"
              value={searchInput}
              onInput={(e) => setSearchInput(e.currentTarget.value)}
              autoComplete="off"
            />
            <ColorToggle
              name="pomegranate"
              tailwindColor="red"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("pomegranate")) {
                  let temp = visibles.replace("pomegranate", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "pomegranate");
                }
              }}
            />
            <ColorToggle
              name="apricot"
              tailwindColor="orange"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("apricot")) {
                  let temp = visibles.replace("apricot", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "apricot");
                }
              }}
            />
            <ColorToggle
              name="banana"
              tailwindColor="yellow"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("banana")) {
                  let temp = visibles.replace("banana", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "banana");
                }
              }}
            />
            <ColorToggle
              name="lime"
              tailwindColor="lime"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("lime")) {
                  let temp = visibles.replace("lime", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "lime");
                }
              }}
            />
            <ColorToggle
              name="kiwi"
              tailwindColor="emerald"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("kiwi")) {
                  let temp = visibles.replace("kiwi", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "kiwi");
                }
              }}
            />
            <ColorToggle
              name="blueberry"
              tailwindColor="cyan"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("blueberry")) {
                  let temp = visibles.replace("blueberry", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "blueberry");
                }
              }}
            />
            <ColorToggle
              name="huckleberry"
              tailwindColor="blue"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("huckleberry")) {
                  let temp = visibles.replace("huckleberry", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "huckleberry");
                }
              }}
            />
            <ColorToggle
              name="plum"
              tailwindColor="indigo"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("plum")) {
                  let temp = visibles.replace("plum", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "plum");
                }
              }}
            />
            <ColorToggle
              name="grape"
              tailwindColor="purple"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("grape")) {
                  let temp = visibles.replace("grape", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "grape");
                }
              }}
            />
            <ColorToggle
              name="dragonfruit"
              tailwindColor="pink"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("dragonfruit")) {
                  let temp = visibles.replace("dragonfruit", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "dragonfruit");
                }
              }}
            />
            <ColorToggle
              name="blackberry"
              tailwindColor="slate"
              visibles={visibles}
              onClick={() => {
                if (visibles.includes("blackberry")) {
                  let temp = visibles.replace("blackberry", "");
                  setVisibles(temp);
                } else {
                  setVisibles(visibles + "blackberry");
                }
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`${addModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-xl shadow-md px-8 py-8 md:px-12 md:py-11">
          <form>
            <button
              className="absolute top-6 right-7 text-lg hover:text-gray-500 transition-all"
              onClick={() => {
                setNameInput("");
                setDescInput("");
                setLinkInput("");
                setAddModalVis("fadeIn");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h1 className="text-2xl font-medium mb-6">Add item</h1>

            <label className="text-sm md:text-base text-gray-500 px-2">
              Name
            </label>
            <input
              type="text"
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm md:text-base text-gray-500 px-2">
              Description
            </label>
            <input
              type="text"
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={descInput}
              onInput={(e) => setDescInput(e.currentTarget.value)}
              autoComplete="off"
            />

            <label className="text-sm md:text-base text-gray-500 px-2">
              URL
            </label>
            <input
              type="url"
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={linkInput}
              onInput={(e) => setLinkInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm md:text-base text-gray-500 px-2">
              Color
            </label>
            <select
              onChange={(e) => setColorInput(e.currentTarget.value)}
              value={colorInput}
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
            >
              <option value="pomegranate">Pomegranate</option>
              <option value="apricot">Apricot</option>
              <option value="banana">Banana</option>
              <option value="lime">Lime</option>
              <option value="kiwi">Kiwi</option>
              <option value="blueberry">Blueberry</option>
              <option value="huckleberry">Huckleberry</option>
              <option value="plum">Plum</option>
              <option value="grape">Grape</option>
              <option value="dragonfruit">Dragonfruit</option>
              <option value="blackberry">Blackberry</option>
            </select>

            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="md:text-lg text-gray-100 border-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border-transparent rounded-md text-left px-3 py-2 transition-all"
                onClick={(e) => {
                  let tempLinkInp = linkInput;
                  if (
                    !linkInput.includes("http://") &&
                    !linkInput.includes("https://")
                  ) {
                    tempLinkInp = "https://" + linkInput;
                  }

                  if (nameInput == "" || linkInput == "") {
                    alert("Enter a name and URL before adding this item");
                  } else if (!isURL(tempLinkInp)) {
                    alert("Enter a valid URL");
                  } else {
                    const newItem = {
                      id: itemId,
                      name: nameInput,
                      desc: descInput,
                      link: tempLinkInp,
                      color: colorInput,
                    };
                    items.push(newItem);
                    setNameInput("");
                    setDescInput("");
                    setLinkInput("");
                    setItemId(itemId + 1);
                    setAddModalVis("fadeIn");

                    localStorage.setItem("pantry", JSON.stringify(items));
                  }
                  e.preventDefault();
                }}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-1 md:mr-1.5" />
                Add item
              </button>

              <button
                className="md:text-lg border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition-all"
                onClick={() => {
                  setNameInput("");
                  setDescInput("");
                  setLinkInput("");
                  setAddModalVis("fadeIn");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`${editModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-xl shadow-md px-8 py-8 md:px-12 md:py-11">
          <form>
            <button
              className="absolute top-6 right-7 text-lg hover:text-gray-500 transition-all"
              onClick={() => {
                setNameInput("");
                setDescInput("");
                setLinkInput("");
                setEditModalVis("fadeIn");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h1 className="text-2xl font-medium mb-6">Edit item</h1>

            <label className="text-sm md:text-base text-gray-500 px-2">
              Name
            </label>
            <input
              type="text"
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm md:text-base text-gray-500 px-2">
              Description
            </label>
            <input
              type="text"
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={descInput}
              onInput={(e) => setDescInput(e.currentTarget.value)}
              autoComplete="off"
            />

            <label className="text-sm md:text-base text-gray-500 px-2">
              URL
            </label>
            <input
              type="url"
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={linkInput}
              onInput={(e) => setLinkInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm md:text-base text-gray-500 px-2">
              Color
            </label>
            <select
              onChange={(e) => setColorInput(e.currentTarget.value)}
              value={colorInput}
              className="md:text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
            >
              <option value="pomegranate">Pomegranate</option>
              <option value="apricot">Apricot</option>
              <option value="banana">Banana</option>
              <option value="lime">Lime</option>
              <option value="kiwi">Kiwi</option>
              <option value="blueberry">Blueberry</option>
              <option value="huckleberry">Huckleberry</option>
              <option value="plum">Plum</option>
              <option value="grape">Grape</option>
              <option value="dragonfruit">Dragonfruit</option>
              <option value="blackberry">Blackberry</option>
            </select>

            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="md:text-lg text-gray-100 border-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border-transparent rounded-md text-left px-3 py-2 transition-all"
                onClick={(e) => {
                  let tempLinkInp = linkInput;
                  if (
                    !linkInput.includes("http://") &&
                    !linkInput.includes("https://")
                  ) {
                    tempLinkInp = "https://" + linkInput;
                  }

                  if (nameInput == "" || linkInput == "") {
                    alert("Enter a name and URL before adding this item");
                  } else if (!isURL(tempLinkInp)) {
                    alert("Enter a valid URL");
                  } else {
                    selectedItem.name = nameInput;
                    selectedItem.desc = descInput;
                    selectedItem.link = tempLinkInp;
                    selectedItem.color = colorInput;
                    setNameInput("");
                    setDescInput("");
                    setLinkInput("");
                    setEditModalVis("fadeIn");

                    localStorage.setItem("pantry", JSON.stringify(items));
                  }
                  e.preventDefault();
                }}
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="mr-1.5 md:mr-2"
                />
                Save item
              </button>

              <button
                className="md:text-lg border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition-all"
                onClick={() => {
                  setNameInput("");
                  setDescInput("");
                  setLinkInput("");
                  setEditModalVis("fadeIn");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

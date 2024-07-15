import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Item from "../components/Item";
import ColorToggle from "../components/ColorToggle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faChevronDown,
  faChevronUp,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// to-do
// folders? tags?
// share pantry
// re-arrange items in pantry

export default function Home() {
  const colors = [
    "pomegranate",
    "apricot",
    "banana",
    "lime",
    "kiwi",
    "blueberry",
    "huckleberry",
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

  const [viewType, setViewType] = useState(1);

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
    setViewType(Number(localStorage.getItem("viewType") || "1") as number);
  }, []);

  function isURL(s: string) {
    return /^((http:\/\/)|(https:\/\/)).+\..+/g.test(s);
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <title>Web Pantry</title>
        <meta property="og:title" content="Web Pantry" />
        <meta property="og:description" content="" />
        <meta name="theme-color" content="#83b5d3" />
        <meta property="og:image" content="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cutive&display=swap"
        />
      </Head>

      <div className="bg-gray-200 border-b-2 border-gray-300 md:sticky top-0 left-0 flex items-end z-20 px-8 py-6">
        <h1 className="font-cutive text-xl md:text-2xl font-bold text-gray-800 -mb-1 md:-mb-2">
          Web Pantry
          {/* webmarks, webfruits, web fridge, webository */}
        </h1>
        <div className="flex md:hidden gap-2 md:gap-4 ml-auto">
          <button
            className="w-max text-gray-700 hover:text-gray-600 hover:underline transition"
            onClick={() => {
              if (optionsVis) setOptionsVis(false);
              else if (!optionsVis) setOptionsVis(true);
            }}
          >
            Options
            <FontAwesomeIcon
              icon={optionsVis ? faChevronUp : faChevronDown}
              className="ml-2"
            />
          </button>
        </div>
      </div>

      <div className="flex text-white gap-6 p-3 md:p-8">
        <div
          className={`${
            optionsVis ? "fadeOut" : "fadeIn"
          } md:fadeOut md:flex-[0.3] lg:flex-[0.2] z-10 h-min absolute top-30 right-3 md:static border-2 border-gray-300 md:border-0 bg-gray-200 shadow-md rounded-3xl lg:rounded-[2rem] p-6 md:p-8 lg:p-10`}
        >
          <h6 className="text-xs text-gray-500 mb-1">View type</h6>
          <button
            className="w-full text-sm text-gray-900 text-left border-2 border-gray-300 hover:bg-gray-300 active:bg-gray-400/50 active:border-transparent rounded-md px-3 py-1.5 transition"
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
            <span>{viewType == 0 ? " List" : " Cards"}</span>
          </button>

          <h6 className="text-xs text-gray-500 mb-1 mt-8">Filter items</h6>
          <div>
            <input
              type="text"
              placeholder="Search items..."
              className="flex items-center w-full text-sm text-gray-900 border-2 bg-transparent border-gray-300 hover:bg-gray-300 rounded-md px-3 py-1.5 mb-2 transition"
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

        <div className="flex-1 bg-gray-200 shadow-md rounded-3xl lg:rounded-[2rem] p-6 md:p-8 lg:p-10">
          <div
            className={`${
              viewType == 0 ? "" : "lg:grid-cols-2 md:gap-x-4 gap-y-4"
            } grid grid-cols-1 items-stretch`}
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

            <div className={viewType == 0 ? "mt-1.5" : ""}>
              <div className="h-full">
                <button
                  className={`${
                    viewType == 0
                      ? "min-h-8 rounded-md px-4 py-2"
                      : "min-h-20 rounded-xl shadow-md active:shadow-none"
                  } w-full h-full flex items-center bg-gray-500 hover:bg-gray-600 active:bg-gray-700 mx-auto transition`}
                  onClick={() => {
                    setColorInput(
                      colors[Math.floor(Math.random() * colors.length)]
                    );
                    setAddModalVis("fadeOut");
                  }}
                >
                  <div
                    className={`flex items-center ${
                      viewType == 0 ? "items-left" : "mx-auto"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faAdd}
                      className={viewType == 0 ? "text-lg mr-1.5" : "text-4xl"}
                    />
                    <span className={viewType == 0 ? "text-base" : "hidden"}>
                      {viewType == 0 ? "Add pantry item" : ""}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add modal */}
      <div
        className={`${addModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-xl shadow-md px-8 py-8 md:px-11 md:py-10">
          <form>
            <button
              className="absolute top-6 right-7 text-base hover:text-gray-500 transition"
              onClick={() => {
                setNameInput("");
                setDescInput("");
                setLinkInput("");
                setAddModalVis("fadeIn");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h1 className="text-xl font-medium mb-6">Add pantry item</h1>

            <label className="text-sm text-gray-500 px-2">Name</label>
            <input
              type="text"
              className="block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm text-gray-500 px-2">Description</label>
            <input
              type="text"
              className="block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
              value={descInput}
              onInput={(e) => setDescInput(e.currentTarget.value)}
              autoComplete="off"
            />

            <label className="text-sm text-gray-500 px-2">URL</label>
            <input
              type="url"
              className="block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
              value={linkInput}
              onInput={(e) => setLinkInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm text-gray-500 px-2">Color</label>
            <select
              onChange={(e) => setColorInput(e.currentTarget.value)}
              value={colorInput}
              className="block darkArrowsSelect bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
            >
              <option value="pomegranate">Pomegranate</option>
              <option value="apricot">Apricot</option>
              <option value="banana">Banana</option>
              <option value="lime">Lime</option>
              <option value="kiwi">Kiwi</option>
              <option value="blueberry">Blueberry</option>
              <option value="huckleberry">Huckleberry</option>
              <option value="grape">Grape</option>
              <option value="dragonfruit">Dragonfruit</option>
              <option value="blackberry">Blackberry</option>
            </select>

            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="text-gray-100 border-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border-transparent rounded-md text-left px-3 py-2 transition"
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
                      id: Math.floor(Math.random() * 10000000000),
                      name: nameInput,
                      desc: descInput,
                      link: tempLinkInp,
                      color: colorInput,
                    };
                    items.push(newItem);
                    setNameInput("");
                    setDescInput("");
                    setLinkInput("");
                    setAddModalVis("fadeIn");

                    localStorage.setItem("pantry", JSON.stringify(items));
                  }
                  e.preventDefault();
                }}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-1 md:mr-1.5" />
                Add pantry item
              </button>

              <button
                className="border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition"
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

      {/* edit modal */}
      <div
        className={`${editModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-xl shadow-md px-8 py-8 md:px-11 md:py-10">
          <form>
            <button
              className="absolute top-6 right-7 text-base hover:text-gray-500 transition"
              onClick={() => {
                setNameInput("");
                setDescInput("");
                setLinkInput("");
                setEditModalVis("fadeIn");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h1 className="text-xl font-medium mb-6">Edit link</h1>

            <label className="text-sm text-gray-500 px-2">Name</label>
            <input
              type="text"
              className="block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm text-gray-500 px-2">Description</label>
            <input
              type="text"
              className="block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
              value={descInput}
              onInput={(e) => setDescInput(e.currentTarget.value)}
              autoComplete="off"
            />

            <label className="text-sm text-gray-500 px-2">URL</label>
            <input
              type="url"
              className="block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
              value={linkInput}
              onInput={(e) => setLinkInput(e.currentTarget.value)}
              autoComplete="off"
              required
            />

            <label className="text-sm text-gray-500 px-2">Color</label>
            <select
              onChange={(e) => setColorInput(e.currentTarget.value)}
              value={colorInput}
              className="block darkArrowsSelect bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition"
            >
              <option value="pomegranate">Pomegranate</option>
              <option value="apricot">Apricot</option>
              <option value="banana">Banana</option>
              <option value="lime">Lime</option>
              <option value="kiwi">Kiwi</option>
              <option value="blueberry">Blueberry</option>
              <option value="huckleberry">Huckleberry</option>
              <option value="grape">Grape</option>
              <option value="dragonfruit">Dragonfruit</option>
              <option value="blackberry">Blackberry</option>
            </select>

            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="text-gray-100 border-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border-transparent rounded-md text-left px-3 py-2 transition"
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
                Save link
              </button>

              <button
                className="border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition"
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

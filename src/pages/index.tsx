import { useState, useEffect } from "react";

import Head from "next/head";
import Item from "../components/Item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// to-do
// save pantry items after refreshing page
// filter which colors of the pantry items show
// share pantry

export default function Home() {
  const [itemId, setItemId] = useState(3);

  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [colorInput, setColorInput] = useState("blueberry");

  const [addModalVis, setAddModalVis] = useState("fadeIn");
  const [editModalVis, setEditModalVis] = useState("fadeIn");

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

  const [items, setItems] = useState([
    {
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
    },
  ]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("pantry") || "[]") as Item[]);
  }, []);

  function isURL(s: string) {
    // https://stackoverflow.com/a/5717133

    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(s);
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
        <meta property="og:description" content="description" />
        <meta name="theme-color" content="#83b5d3" />
        <meta
          property="og:image"
          content="https://bunnies.jakeo.dev/images/solid-gradient-blue-black-bunny.png"
        />
      </Head>

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
                setColorInput("blueberry");
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
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              required
            ></input>

            <label className="text-sm md:text-base text-gray-500 px-2">
              Description
            </label>
            <input
              type="text"
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={descInput}
              onInput={(e) => setDescInput(e.currentTarget.value)}
              autoComplete="off"
            ></input>

            <label className="text-sm md:text-base text-gray-500 px-2">
              URL
            </label>
            <input
              type="url"
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={linkInput}
              onInput={(e) => setLinkInput(e.currentTarget.value)}
              autoComplete="off"
              required
            ></input>

            <label className="text-sm md:text-base text-gray-500 px-2">
              Color
            </label>
            <select
              onChange={(e) => setColorInput(e.currentTarget.value)}
              value={colorInput}
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
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
                    setColorInput("blueberry");
                    setItemId(itemId + 1);
                    setAddModalVis("fadeIn");

                    localStorage.setItem("pantry", JSON.stringify(items));
                  }
                  e.preventDefault();
                }}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-[0.375rem]" />
                Add item
              </button>

              <button
                className="md:text-lg border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition-all"
                onClick={() => {
                  setNameInput("");
                  setDescInput("");
                  setLinkInput("");
                  setColorInput("blueberry");
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
                setColorInput("blueberry");
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
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              required
            ></input>

            <label className="text-sm md:text-base text-gray-500 px-2">
              Description
            </label>
            <input
              type="text"
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={descInput}
              onInput={(e) => setDescInput(e.currentTarget.value)}
              autoComplete="off"
            ></input>

            <label className="text-sm md:text-base text-gray-500 px-2">
              URL
            </label>
            <input
              type="url"
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
              value={linkInput}
              onInput={(e) => setLinkInput(e.currentTarget.value)}
              autoComplete="off"
              required
            ></input>

            <label className="text-sm md:text-base text-gray-500 px-2">
              Color
            </label>
            <select
              onChange={(e) => setColorInput(e.currentTarget.value)}
              value={colorInput}
              className="text-lg block bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-md w-full px-3 py-2 mb-4 transition-all"
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
                    setColorInput("blueberry");
                    setEditModalVis("fadeIn");

                    localStorage.setItem("pantry", JSON.stringify(items));
                  }
                  e.preventDefault();
                }}
              >
                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                Save item
              </button>

              <button
                className="md:text-lg border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition-all"
                onClick={() => {
                  setNameInput("");
                  setDescInput("");
                  setLinkInput("");
                  setColorInput("blueberry");
                  setEditModalVis("fadeIn");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-[76rem] mx-auto mt-16 mb-24">
        <h1 className="text-5xl font-black bg-gradient-to-r from-gray-600 to-gray-700 text-transparent bg-clip-text ml-8 mb-6">
          Web Pantry
        </h1>
        {/* webmarks, webfruits, web fridge */}

        <div className="bg-[#795548] border-8 border-[#5d4037] shadow-md rounded-[2.5rem] px-8 py-12 md:px-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end">
            {items.map((item: Item) => (
              <Item
                id={item.id}
                name={item.name}
                desc={item.desc}
                link={item.link}
                color={item.color}
                visible={true} // item.color == "lime"
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
                    const updatedItems = items.filter(
                      (i: Item) => i.id !== item.id
                    ); // Filter out the item to be deleted
                    setItems(updatedItems);

                    localStorage.setItem("pantry", JSON.stringify(updatedItems));
                  }
                }}
              />
            ))}

            <div className="md:border-b-4 border-b-[#5d4037] pb-6 md:mb-16 px-3">
              <button
                className={`w-full h-40 flex items-center border-8 border-gray-100 hover:bg-gray-100 active:bg-gray-200 active:border-gray-200 text-gray-100 hover:text-gray-600 active:text-gray-600 rounded-3xl shadow-md active:shadow-none mx-auto transition-all`}
                onClick={() => setAddModalVis("fadeOut")}
              >
                <div className="flex items-center mx-auto">
                  <FontAwesomeIcon icon={faAdd} className="text-5xl" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

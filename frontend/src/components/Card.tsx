import { useState, type MouseEvent } from "react";
import iconFreeCodeCamp from "../assets/images/favicon-freecodecamp.png";
import iconMenuBookMark from "../assets/images/icon-menu-bookmark.svg";
import iconVisitCount from "../assets/images/icon-visit-count.svg";
import iconPin from "../assets/images/icon-pin.svg";
import iconLastVisit from "../assets/images/icon-last-visited.svg";
import iconCreated from "../assets/images/icon-created.svg";
import iconEdit from "../assets/images/icon-edit.svg";
import iconArchive from "../assets/images/icon-archive.svg";
import iconCopy from "../assets/images/icon-copy.svg";

const Card = () => {
  const [open, setOpen] = useState(false);

  const toggleOption = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const stopMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className="flex flex-col gap-1 shadow-lg rounded-lg bg-white py-4"
        onClick={() => setOpen(false)}
      >
        <div className="flex flex-row justify-between px-4  w-full items-center">
          <div className="flex flex-row gap-2 w-full items-center">
            <img
              src={iconFreeCodeCamp}
              alt="logo"
              className="w-10 h-10 rounded-sm"
            />
            <div className="flex flex-col w-full">
              <div className="flex flex-row  justify-between">
                <h4 className="text-xl font-semibold">Free Code Camp</h4>
                <div className="inline-block relative">
                  <button
                    className="border-1  border-neutral-300  round-sm flex items-center px-1 rounded-sm py-1"
                    onClick={toggleOption}
                  >
                    <img
                      src={iconMenuBookMark}
                      alt="menubookmark"
                      className="w-5 h-5"
                    />
                  </button>
                  {open ? (
                    <div
                      className="absolute right-0 mt-2 flex min-w-[170px] flex-col gap-5 rounded-sm bg-white px-3 py-3 pr-5 shadow-[0_24px_80px_rgba(5,21,19,0.18)]"
                      onClick={stopMenuClick}
                    >
                      <button className="flex flex-row gap-2 items-center hover:bg-neutral-100 px-5 py-2 rounded-sm">
                        <img src={iconEdit} alt="edit" className="w-3 h-3" />
                        <span className="text-[1rem]">Edit</span>
                      </button>
                      <button className="flex flex-row gap-2 items-center hover:bg-neutral-100 px-5 py-2 rounded-sm">
                        <img src={iconCopy} alt="copy" className="w-3 h-3" />
                        <span className="text-[1rem]">Copy URL</span>
                      </button>
                      <button className="flex flex-row gap-2 items-center hover:bg-neutral-100 px-5 py-2 rounded-sm">
                        <img
                          src={iconArchive}
                          alt="archive"
                          className="w-3 h-3"
                        />
                        <span className="text-[1rem]">Archive</span>
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <span className="text-xs text-neutral-500">freecodecamp.io</span>
            </div>
          </div>
        </div>
        <hr className="my-2 border-0.5 border-blue-300 mx-4" />
        <div className="flex flex-col gap-5 px-4">
          <p className="text-sm  font-medium max-w[] text-neutral-500">
            Learn to code for free. Build projects. Earn certifications. An open
            source community that helps you learn to code with free online
            courses and certifications
          </p>
          <ul className="flex flex-wrap gap-2 items-center  text-[0.75rem]">
            <li className="bg-neutral-300 rounded-sm px-3 py-0.5 text-neutral-500">
              Practice
            </li>
            <li className="bg-neutral-300 rounded-sm px-3 py-0.5 text-neutral-500">
              Learning
            </li>
            <li className="bg-neutral-300 rounded-sm px-3 py-0.5 text-neutral-500">
              Community
            </li>
          </ul>
        </div>
        <hr className="my-2 border-0.5 border-blue-300" />
        <div className="flex flex-row justify-between px-4 text-neutral-500 font-medium">
          <div className="flex flex-row flex-wrap items-center gap-2">
            <div className="flex flex-row gap-1.5 items-center">
              <img src={iconVisitCount} alt="visit count" className="w-3 h-3" />
              <span className="text-xs">47</span>
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <img src={iconLastVisit} alt="last visit" className="w-3 h-3" />
              <span className="text-xs">20</span>
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <img src={iconCreated} alt="created" className="w-3 h-3" />
              <span className="text-xs">15 Jan</span>
            </div>
          </div>
          <img src={iconPin} alt="pin" className="h-4 w-4" />
        </div>
      </div>
    </>
  );
};

export default Card;

import iconClose from "../assets/images/icon-close.svg";
import type { Dispatch, SetStateAction } from "react";

interface ChildProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddBookMark = ({ setOpen }: ChildProps) => {
  const closeModal = () => setOpen(false);
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051513]/50 px-4 p-300 ">
        {/* <button
          type="button"
          aria-label="Close add bookmark modal"
          className="absolute"
          onClick={closeModal}
        /> */}
        <div className="relative z-10 w-full max-w-[500px] rounded-[28px] bg-white p-7 shadow-[0_24px_80px_rgba(5,21,19,0.18)] md:p-8">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-[1.5rem] font-semibold">
                Add a Bookmark
              </h2>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-sm text-muted transition hover:bg-neutral-100"
                onClick={closeModal}
              >
                <img
                  src={iconClose}
                  alt="close"
                  className="h-4 w-4 opacity-70"
                />
              </button>
            </div>
            <span className="text-sm leading-7 mt-1">
              Save a link with details to keep your collection organized.
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">Title *</span>
              <input
                type="text"
                className="h-12 rounded-xl border border-[#c9d6d3] px-5 text-base text-app outline-none transition focus:border-[#8fa6a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">
                Description *
              </span>
              <textarea className="min-h-30 rounded-xl border border-[#c9d6d3] px-5 py-4 text-base text-app outline-none transition focus:border-[#8fa6a1]" />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">
                Website URL *
              </span>
              <input
                type="text"
                className="h-12 rounded-xl border border-[#c9d6d3] px-5 text-base text-app outline-none transition focus:border-[#8fa6a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">Tags *</span>
              <input
                type="text"
                placeholder="e.g. design, learning, tools"
                className="h-12 rounded-xl border border-[#c9d6d3] px-5 text-base text-app outline-none transition placeholder:text-neutral-400 focus:border-[#8fa6a1]"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-row justify-end gap-3">
            <button
              type="button"
              className="rounded-xl border border-[#c9d6d3] px-7 py-3 text-[1.05rem] font-medium text-app transition hover:bg-neutral-100"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-xl bg-teal-800 px-8 py-3 text-[1.05rem] font-medium text-white transition hover:bg-teal-700"
            >
              Add Bookmark
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookMark;

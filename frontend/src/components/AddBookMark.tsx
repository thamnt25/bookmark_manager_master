import iconClose from "../assets/images/icon-close.svg";
import axios from "axios";
import type { BookMarkSugesstion } from "../models/BookMarkSugesstion";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { API_URLS } from "../config/api";

interface ChildProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddBookMark = ({ setOpen }: ChildProps) => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [bookMarkSuggest, setBookMarkSuggest] = useState<BookMarkSugesstion>();
  const [isGenerating, setIsGenerating] = useState(false);

  const closeModal = () => setOpen(false);

  async function generateBookmarkDetails() {
    setIsGenerating(true);
    if (!websiteUrl) {
      console.log("Website url is empty");
      return;
    }
    const metaData = await fetchAIMetaData(websiteUrl);
    setBookMarkSuggest(metaData);
    console.log(metaData);
    setIsGenerating(false);
  }

  async function fetchAIMetaData(bookUrl: string) {
    const response = await axios.post(API_URLS.bookmarkSuggest, {
      url: bookUrl,
    });
    return response.data;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051513]/50 px-4 p-300 ">
        <div className="relative z-10 w-full max-w-[500px] rounded-[28px] bg-white p-7 shadow-[0_24px_80px_rgba(5,21,19,0.18)] md:p-8">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row justify-between w-full">
              <h2 className="text-[1.5rem] font-semibold">Add a Bookmark</h2>
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
            <span className="text-sm leading-7">
              Save a link with details to keep your collection organized.
            </span>
          </div>

          <form className="mt-3 flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">
                Website URL *
              </span>
              <input
                type="text"
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
                // onBlur={() => fetchWebsiteTitle(websiteUrl)}
                className="h-10 rounded-xl border border-[#c9d6d3] px-5 text-base text-app outline-none transition focus:border-[#8fa6a1]"
              />
            </label>
            <button
              type="button"
              onClick={generateBookmarkDetails}
              disabled={!websiteUrl.trim() || isGenerating}
              className="rounded-xl bg-teal-800 px-4 py-2 text-white disabled:opacity-50 hover:bg-teal-700"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">Title *</span>
              <input
                type="text"
                value={bookMarkSuggest?.title || ""}
                // onChange={(event) => setTitle(event.target.value)}
                className="h-10 rounded-xl border border-[#c9d6d3] px-5 text-base text-app outline-none transition focus:border-[#8fa6a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">
                Description *
              </span>
              <textarea
                className="min-h-30 rounded-xl border border-[#c9d6d3] px-5 py-4 text-base text-app outline-none transition focus:border-[#8fa6a1]"
                value={bookMarkSuggest?.description || ""}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-app">Tags *</span>
              <input
                type="text"
                placeholder="e.g. design, learning, tools"
                value={bookMarkSuggest?.tags || ""} 
                className="h-10 rounded-xl border border-[#c9d6d3] px-5 text-base text-app outline-none transition placeholder:text-neutral-400 focus:border-[#8fa6a1]"
              />
            </label>
          </form>

          <div className="mt-3 flex flex-row justify-end gap-3">
            <button
              type="button"
              className="rounded-xl border border-[#c9d6d3] px-5 py-2 text-[1.05rem] font-medium text-app transition hover:bg-neutral-100"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-xl bg-teal-800 px-5 py-2 text-[1.05rem] font-medium text-white transition hover:bg-teal-700"
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

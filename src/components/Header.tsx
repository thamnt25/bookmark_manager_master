import iconAdd from "../assets/images/icon-add.svg";
import iconAvatar from "../assets/images/image-avatar.webp";
import iconMenuHamburger from "../assets/images/icon-menu-hamburger.svg";
import iconSearch from "../assets/images/icon-search.svg";

type HeaderProps = {
  onOpenSidebar?: () => void;
};

const Header = ({ onOpenSidebar }: HeaderProps) => {
  return (
    <>
      <header className="w-full bg-white px-4 py-3 md:px-6 lg:px-8 shadow-xs">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open sidebar"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white lg:hidden"
              onClick={onOpenSidebar}
            >
              <img src={iconMenuHamburger} alt="" className="h-5 w-5" />
            </button>
            <label className="flex h-11 w-full max-w-[330px] items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 shadow-[0_1px_2px_rgba(5,21,19,0.04)] transition focus-within:border-neutral-300">
              <img
                src={iconSearch}
                alt="search"
                className="h-4 w-4 shrink-0 opacity-55"
              />
              <input
                type="text"
                className="w-full border-0 bg-transparent text-sm font-medium text-app placeholder:text-neutral-500 outline-none focus:outline-none focus:ring-0 focus:border-0"
                placeholder="Search by title..."
              />
            </label>
          </div>
          <div className="flex flex-row gap-2 md:gap-3">
            <button className="flex flex-row items-center sm:gap-2 rounded-sm bg-teal-800 px-3 py-2 text-white md:px-5 md:py-1">
              <img src={iconAdd} alt="addIcon" className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Add Bookmark</span>
            </button>
            <button className="w-10 h-10 rounded-full">
              <img src={iconAvatar} alt="avatar"  />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;

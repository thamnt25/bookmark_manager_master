import iconHome from "../assets/images/icon-home.svg";
import iconArchived from "../assets/images/icon-archive.svg";
import iconClose from "../assets/images/icon-close.svg";
import iconLogoLightTheme from "../assets/images/logo-light-theme.svg";

const navItems = [
  { title: "Home", icon: iconHome, active: true },
  { title: "Archived", icon: iconArchived, active: false },
];

const tags = [
  { name: "AI", count: 1 },
  { name: "Community", count: 2 },
  { name: "CSS", count: 3 },
];

type SideBarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const SideBar = ({ isOpen = false, onClose }: SideBarProps) => {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/35 lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[280px] shadow-sm bg-white px-4 py-6 transition-transform duration-300 lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <div className="flex items-center justify-between">
          <img src={iconLogoLightTheme} alt="Bookmark Manager" />
          <button
            type="button"
            aria-label="Close sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 lg:hidden"
            onClick={onClose}
          >
            <img src={iconClose} alt="" className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-5 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.title}
              className={`flex w-full flex-row gap-2 rounded-sm px-2 py-2 text-left ${
                item.active ? "bg-neutral-100" : "hover:bg-neutral-100"
              }`}
            >
              <img src={item.icon} alt="" />
              <span className="text-sm font-medium text-neutral-500">
                {item.title}
              </span>
            </button>
          ))}
        </nav>
        <div className="mt-5 px-2 text-sm font-medium text-neutral-500">TAGS</div>
        <div className="mt-5 flex flex-col gap-4 px-2">
          {tags.map((item) => (
            <div key={item.name} className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <input type="checkbox" className="rounded-xs" />
                <span className="text-sm font-medium text-neutral-500">
                  {item.name}
                </span>
              </div>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-center text-xs font-medium text-neutral-500">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideBar;

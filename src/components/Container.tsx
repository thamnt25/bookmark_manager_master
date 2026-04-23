import iconSort from "../assets/images/icon-sort.svg";
import Card from "./Card";

const Container = () => {
  return (
    <>
      <section className="mt-8 px-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl text-black font-semibold">All bookmarks</h2>
          <button className="flex flex-row gap-2 bg-white rounded-sm border-1 border-neutral-300 items-center px-2 py-2">
            <img src={iconSort} alt="sort" className="w-5 h-5" />
            <span className="text-sm">Sort by</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-5">
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
};

export default Container;

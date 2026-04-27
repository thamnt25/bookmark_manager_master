import "./App.css";
import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Container from "./components/Container";
import axios from "axios";
import type { BookMark } from "./models/BookMark";

const URL: string = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookMarks, setBookMarks] = useState<BookMark[]>([]);
  const [bookmarkTags, setBookMarksTags] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const fetchAllBookMark = async () => {
      const response = await axios.get<BookMark[]>(URL);
      setBookMarks(response.data);
    };
    fetchAllBookMark();
    const tags = tagFilter(bookMarks);
    setBookMarksTags(tags);
    console.log(bookmarkTags);
  }, []);

  function tagFilter(bookMarks: BookMark[]): Map<string, number> {
    if (bookMarks.length === 0) {
      return new Map<string, number>();
    }
    let tags = new Map<string, number>();
    bookMarks.forEach((item) => {
      item.tags.forEach((tag) => {
        if (!tags.has(tag)) {
          tags.set(tag, 1);
        }
        tags.set(tag, (tags.get(tag) ?? 0) + 1);
      });
    });
    return tags;
  }

  return (
    <>
      <main className="flex min-h-screen flex-row bg-[#E8F2F1]">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="w-full">
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
          <Container bookmarks={bookMarks} />
        </div>
      </main>
    </>
  );
}

export default App;

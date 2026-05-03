import "./App.css";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Container from "./components/Container";
import axios from "axios";
import type { BookMark } from "./models/BookMark";
import { API_URLS } from "./config/api";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookMarks, setBookMarks] = useState<BookMark[]>([]);
  const [bookmarkTags, setBookMarksTags] = useState<Map<string, number>>(
    new Map(),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHome, setSelectedHomeTab] = useState(true);

  useEffect(() => {
    const fetchAllBookMark = async () => {
      const response = await axios.get<BookMark[]>(API_URLS.bookMarks);
      setBookMarks(response.data);
      console.log(response.data);
      setBookMarksTags(tagFilter(response.data));
    };

    fetchAllBookMark();
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const filteredBookMarks = bookMarks.filter((bookmark) => {
    const matchesSearch =
      query.length === 0 ||
      [bookmark.title, bookmark.description, bookmark.url, ...bookmark.tags]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((selectedTag) =>
        bookmark.tags.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
        ),
      );

    const archivedTab = !selectedHome
      ? bookmark.isArchived
      : !bookmark.isArchived || bookmark.isArchived;
    return matchesSearch && matchesTags && archivedTab;
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  };

  function tagFilter(bookMarks: BookMark[]): Map<string, number> {
    if (bookMarks.length === 0) {
      return new Map<string, number>();
    }

    const tags = new Map<string, number>();
    bookMarks.forEach((item) => {
      item.tags.forEach((tag) => {
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
          tags={bookmarkTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          selectedHomeTab={selectedHome}
          setSelectedHomeTab={setSelectedHomeTab}
        />
        <div className="w-full">
          <Header
            onOpenSidebar={() => setIsSidebarOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <Container
            bookmarks={filteredBookMarks.sort(
              (a, b) => Number(b.pinned) - Number(a.pinned),
            )}
          />
        </div>
      </main>
    </>
  );
}

export default App;

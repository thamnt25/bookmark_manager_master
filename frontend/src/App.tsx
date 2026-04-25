import "./App.css";
import { useState } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Container from "./components/Container";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-row bg-[#E8F2F1]">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="w-full">
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
          <Container />
        </div>
      </main>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import TemplatePage from "@/pages/TemplatePage";
import FriendCirclePage from "@/pages/FriendCirclePage";
import { createContext, useState } from "react";
import Header from "@/components/Header";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Header />
      <main className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<TemplatePage />} />
          <Route path="/circle" element={<FriendCirclePage />} />
        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>

  );
}

import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold text-blue-700">
            潮汐友人帐 2.0
          </Link>
          <nav className="md:flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              首页
            </Link>
            <Link
              to="/circle"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/circle" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              朋友圈
            </Link>
            <Link
              to="/add"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/add" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              添加友链
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/about" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              关于
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

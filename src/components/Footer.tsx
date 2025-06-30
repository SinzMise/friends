import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 place-content-center">其它链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="https://www.storical.space/" className="text-gray-600 hover:text-blue-600">
                  故事空间
                </Link>
              </li>
              <li>
                <Link to="https://blog.storical.space/" className="text-gray-600 hover:text-blue-600">
                  汐塔魔法屋
                </Link>
              </li>
              <li>
                <Link to="https://diary.sinzmise.top/" className="text-gray-600 hover:text-blue-600">
                  中弦记事本
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© {new Date().getFullYear()} <a href="https://www.storical.space/">SinZero Limited</a></p>
        </div>
      </div>
    </footer>
  );
}

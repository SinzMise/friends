import { useState, useEffect } from "react";
import { loadLinkData, LinkCategory } from "@/data/links";
import LinkCard from "@/components/LinkCard";
import CategoryNav from "@/components/CategoryNav";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [linkData, setLinkData] = useState<LinkCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadLinkData();
      setLinkData(data);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSelectCategory = (index: number) => {
    setSelectedCategory(index);
    setSearchQuery("");
  };

  if (linkData.length === 0) {
    return <div className="min-h-screen bg-white">Loading...</div>;
  }

  const filteredLinks = linkData[selectedCategory].list.filter(
    (link) =>
      link.name.toLowerCase().includes(searchQuery) ||
      link.desc.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-16 z-10 bg-white p-4 shadow-sm">
        <div className="w-full mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="搜索友链..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="sticky top-32 h-[calc(100vh-8rem)] w-1/5 overflow-y-auto border-r p-4">
          <CategoryNav 
            categories={linkData} 
            onSelectCategory={handleSelectCategory} 
          />
        </div>
        <div className="w-4/5 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredLinks.map((link) => (
              <LinkCard key={link.url} link={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
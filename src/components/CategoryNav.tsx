import { LinkCategory } from "@/data/links";
import { useState } from "react";

interface CategoryNavProps {
  categories: LinkCategory[];
  onSelectCategory: (index: number) => void;
}

export default function CategoryNav({ categories, onSelectCategory }: CategoryNavProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onSelectCategory(index);
  };

  return (
    <div className="w-full space-y-2">
      {categories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => handleSelect(index)}
          className={`w-full rounded-md px-4 py-2 text-left transition-colors ${selectedIndex === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
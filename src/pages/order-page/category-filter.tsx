import { useEffect, useState } from "react";
import { productService } from "@/services/productService";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<
    { label: string; count: number }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="bg-[#fafaf8] rounded-xl p-5 sticky top-[100px]">
      <h3 className="text-[18px] font-semibold text-[#45690b] mb-4">
        Danh mục
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange("")}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            activeCategory === ""
              ? "bg-[#45690b] text-white"
              : "bg-white text-[#45690b] hover:bg-[#d9ef7f]/30"
          }`}
        >
          <span className="font-medium">Tất cả</span>
          <span className="text-sm opacity-70">{totalCount}</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.label}
            onClick={() => onCategoryChange(category.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeCategory === category.label
                ? "bg-[#45690b] text-white"
                : "bg-white text-[#45690b] hover:bg-[#d9ef7f]/30"
            }`}
          >
            <span className="font-medium">{category.label}</span>
            <span className="text-sm opacity-70">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

interface Props {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter: React.FC<Props> = ({ categories, activeCategory, onSelect }) => {
  return (
    <nav className="bg-white px-[20px] py-[8px] flex gap-[8px] border-b border-[#e8e8e8] h-[45px] items-center overflow-x-auto scrollbar-hide shrink-0">
      <button
        onClick={() => onSelect('All')}
        className={`px-[12px] py-[4px] rounded-[20px] text-[12px] whitespace-nowrap cursor-pointer border transition-colors ${
          activeCategory === 'All' 
            ? 'bg-white border-[#ee4d2d] text-[#ee4d2d]' 
            : 'bg-[#f0f0f0] border-transparent text-[#222]'
        }`}
      >
        Semua
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-[12px] py-[4px] rounded-[20px] text-[12px] whitespace-nowrap cursor-pointer border transition-colors ${
            activeCategory === cat 
              ? 'bg-white border-[#ee4d2d] text-[#ee4d2d]' 
              : 'bg-[#f0f0f0] border-transparent text-[#222]'
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

import React from 'react';

interface CategoryProps {
  category: number;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div className="flex justify-center items-center flex-shrink-0 w-308px">
      <article>
        <p className="text-xs border-black text-gray-700">{category}</p>
      </article>
    </div>
  );
};

export default Category;

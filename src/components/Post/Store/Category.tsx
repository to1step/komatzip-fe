import React from 'react';

interface CategoryProps {
  category: number;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">{category}</p>
      </article>
    </div>
  );
};

export default Category;

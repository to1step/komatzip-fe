import React from 'react';

interface TagsProps {
  tags: string[];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">{tags}</p>
      </article>
    </div>
  );
};

export default Tags;

import React from 'react';

interface TagsProps {
  tags: string[];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex h-[28px] w-[296px]">
      {tags.map((tag, index) => (
        <section
          key={index}
          className="rounded-xl p-1 bg-[#DCDEE7] mr-1 text-xs"
        >
          {tag}
        </section>
      ))}
    </div>
  );
};

export default Tags;

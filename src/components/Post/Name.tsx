import React from 'react';

interface NameProps {
  name: string;
}

const Name = ({ name }: NameProps) => {
  return (
    <div className="flex justify-center items-center flex-shrink-0 w-308px">
      <article>
        <p className="text-xs border-black text-gray-700">{name}</p>
      </article>
    </div>
  );
};

export default Name;

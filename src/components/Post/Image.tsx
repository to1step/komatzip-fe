import React from 'react';

interface ImageProps {
  representImage: string;
}

const Image = ({ representImage }: ImageProps) => {
  return (
    <div className="flex justify-center items-center flex-shrink-0 w-308px">
      <article>
        <p className="text-xs border-black text-gray-700">{representImage}</p>
      </article>
    </div>
  );
};

export default Image;

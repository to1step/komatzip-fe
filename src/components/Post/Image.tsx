import React from 'react';

interface ImageProps {
  representImage: string;
}

const Image = ({ representImage }: ImageProps) => {
  return (
    <div className="w-[308px]">
      <article>
        <img src={representImage} alt="Image" />
      </article>
    </div>
  );
};

export default Image;

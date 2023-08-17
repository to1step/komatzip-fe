import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <div className="flex justify-center items-center flex-shrink-0 w-308px">
      <article>
        <p className="text-xs border-black text-gray-700">{description}</p>
      </article>
    </div>
  );
};

export default Description;

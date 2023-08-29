import React from 'react';

interface CategoryProps {
  location: string;
}

const Location = ({ location }: CategoryProps) => {
  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">{location}</p>
      </article>
    </div>
  );
};

export default Location;

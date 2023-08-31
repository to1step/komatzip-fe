import React from 'react';

interface CategoryProps {
  location: string;
}

const Location = ({ location }: CategoryProps) => {
  return (
    <div>
      <article>
        <p className="text-xs text-gray-300 text-10">{location}</p>
      </article>
    </div>
  );
};

export default Location;

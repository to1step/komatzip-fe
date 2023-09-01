interface CategoryProps {
  location: string;
}

const Location = ({ location }: CategoryProps) => {
  return (
    <div>
      <article>
        <p className="text-xs text-gray-300">{location}</p>
      </article>
    </div>
  );
};

export default Location;

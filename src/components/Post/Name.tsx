interface NameProps {
  name: string;
  storeNames?: { [key: string]: string[] };
}

const Name = ({ name, storeNames }: NameProps) => {
  return (
    <div>
      <article>
        {storeNames && storeNames[name] ? (
          <span className="text-xl md:text-2xl font-bold">
            {storeNames[name]}
          </span>
        ) : (
          <span className="text-xl md:text-2xl font-bold">{name}</span>
        )}
      </article>
    </div>
  );
};

export default Name;

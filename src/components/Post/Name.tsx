interface NameProps {
  name: string;
  storeNames: { [key: string]: string[] };
}

const Name = ({ name, storeNames }: NameProps) => {
  return (
    <div>
      <article>
        {storeNames && storeNames[name] ? (
          <span className="text-[25px] font-bold">{storeNames[name]}</span>
        ) : (
          <span className="text-[25px] font-bold">{name}</span>
        )}
      </article>
    </div>
  );
};

export default Name;

interface NameProps {
  name: string;
}

const Name = ({ name }: NameProps) => {
  return (
    <div>
      <article>
        <p className="text-[30px] font-bold">{name}</p>
      </article>
    </div>
  );
};

export default Name;

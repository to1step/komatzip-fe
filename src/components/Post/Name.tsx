interface NameProps {
  name: string;
}

const Name = ({ name }: NameProps) => {
  return (
    <div>
      <article className="h-[28px]">
        <p className="text-[20px] border-black text-gray-700  font-semibold">
          {name}
        </p>
      </article>
    </div>
  );
};

export default Name;

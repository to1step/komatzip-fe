
interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">{description}</p>
      </article>
    </div>
  );
};

export default Description;

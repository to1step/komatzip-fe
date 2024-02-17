interface ILikeProps {
  iLike: boolean;
}

const ILike = ({ iLike }: ILikeProps) => {
  return (
    <div>
      <article>
        <p className="text-2xl font-bold">{iLike}</p>
      </article>
    </div>
  );
};

export default ILike;

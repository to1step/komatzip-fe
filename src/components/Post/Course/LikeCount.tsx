interface LikeCountProps {
  likeCount: number;
}

const LikeCount = ({ likeCount }: LikeCountProps) => {
  return (
    <div>
      <article>
        <p className="text-[25px] font-bold">{likeCount}</p>
      </article>
    </div>
  );
};

export default LikeCount;

interface LikeCountProps {
  likeCount: number;
}

const LikeCount = ({ likeCount }: LikeCountProps) => {
  return (
    <section>
      <h3 className="text-2xl font-bold">{likeCount}</h3>
    </section>
  );
};

export default LikeCount;

interface ReviewCountProps {
  reviewCount: number;
}

const ReviewCount = ({ reviewCount }: ReviewCountProps) => {
  return (
    <div>
      <article>
        <p className="text-[25px] font-bold">{reviewCount}</p>
      </article>
    </div>
  );
};

export default ReviewCount;

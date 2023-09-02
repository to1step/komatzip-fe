interface LongCommentProps {
  longComment: string | null;
}

const LongComment = ({ longComment }: LongCommentProps) => {
  return <div className="text-[10px]">{longComment}</div>;
};

export default LongComment;

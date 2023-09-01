interface LongCommentProps {
  longComment: string | null;
}

const LongComment = ({ longComment }: LongCommentProps) => {
  return <div className="text-xs">{longComment}</div>;
};

export default LongComment;

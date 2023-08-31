

interface LongCommentProps {
  longComment: string | null;
}

const LongComment = ({ longComment }: LongCommentProps) => {
  return <div>{longComment}</div>;
};

export default LongComment;

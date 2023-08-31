interface ShortCommentProps {
  shortComment: string;
}

const ShortComment = ({ shortComment }: ShortCommentProps) => {
  return <div>{shortComment}</div>;
};

export default ShortComment;

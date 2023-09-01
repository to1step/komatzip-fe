interface ShortCommentProps {
  shortComment: string;
}

const ShortComment = ({ shortComment }: ShortCommentProps) => {
  return <div>한 줄 코멘트 : {shortComment}</div>;
};

export default ShortComment;

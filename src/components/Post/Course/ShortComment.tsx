interface ShortCommentProps {
  shortComment: string;
}

const ShortComment = ({ shortComment }: ShortCommentProps) => {
  return (
    <div className="text-xs mt-1 text-amber-100">
      <p>{shortComment}</p>
    </div>
  );
};

export default ShortComment;

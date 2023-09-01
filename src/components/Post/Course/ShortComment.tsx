interface ShortCommentProps {
  shortComment: string;
}

const ShortComment = ({ shortComment }: ShortCommentProps) => {
  return (
    <div className="text-xs">
      <p className="font-bold">🗨️ 한 줄 코멘트 🗨️</p>
      <p>{shortComment}</p>
    </div>
  );
};

export default ShortComment;

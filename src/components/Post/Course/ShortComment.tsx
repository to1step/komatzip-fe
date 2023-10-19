interface ShortCommentProps {
  shortComment: string;
}

const ShortComment = ({ shortComment }: ShortCommentProps) => {
  return (
    <div className="text-xs mt-1 text-amber-100">
      {/* <p className="font-bold">🗨️ 한 줄 코멘트 🗨️</p> */}
      <p>{shortComment}</p>
    </div>
  );
};

export default ShortComment;

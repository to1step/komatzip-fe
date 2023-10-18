interface CommentProps {
  comment: string;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div>
      <article>
        <p className="text-[25px] font-bold">{comment}</p>
      </article>
    </div>
  );
};

export default Comment;

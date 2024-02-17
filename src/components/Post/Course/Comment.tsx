interface CommentProps {
  comment: string;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div>
      <article>
        <p className="text-2xl font-bold">{comment}</p>
      </article>
    </div>
  );
};

export default Comment;

interface UserProps {
  user: string;
}

const User = ({ user }: UserProps) => {
  return (
    <div>
      <article>
        <p className="text-sm font-semibold">{user}의 추천 코스</p>
      </article>
    </div>
  );
};

export default User;

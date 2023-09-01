interface UserProps {
  user: string;
}

const User = ({ user }: UserProps) => {
  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">
          {user}님의 추천 코스
        </p>
      </article>
    </div>
  );
};

export default User;

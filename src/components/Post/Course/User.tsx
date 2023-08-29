interface UserProps {
  user: string;
}

const User = ({ user }: UserProps) => {
  return <div>{user}</div>;
};

export default User;

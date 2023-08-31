

interface IsPrivateProps {
  isPrivate: boolean;
}

const IsPrivate = ({ isPrivate }: IsPrivateProps) => {
  return <div>{isPrivate}</div>;
};

export default IsPrivate;

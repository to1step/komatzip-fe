interface IsPrivateProps {
  isPrivate: boolean;
}

const IsPrivate = ({ isPrivate }: IsPrivateProps) => {
  // 문자열 보간을 통해 isPrivate의 값이 true인지 false인지 출력되도록 함.
  return <div className="text-[10px]">공개여부 : {`${isPrivate}`}</div>;
};

export default IsPrivate;

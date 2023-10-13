const NickName = ({ nickname }: { nickname: string | null }) => {
  return (
    <section className="flex">
      <li className="list-none">닉네임 : {nickname} </li>
      <li className="list-none">
        <button className="underline">수정</button>
      </li>
    </section>
  );
};

export default NickName;

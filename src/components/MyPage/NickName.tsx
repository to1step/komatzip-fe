const NickName = ({ nickname }: { nickname: string | null }) => {
  return (
    <section>
      <li>닉네임</li>
      {/* <li>
        <NickName nickname={nickname} /> // 재귀호출
      </li> */}
      <li>
        <button className="underline">수정</button>
      </li>
    </section>
  );
};

export default NickName;

interface TagsProps {
  tags: string[];
}

// TODO
// Tag 를 구조분해로 받아 쓰고있는데, Card 컴포넌트에 들어가는 매장의 고유 id 도 같이 남겨줘서
// 매장 고유 iD + 태그 정보를 가지고 key 를 할당해 줘보세요

const Tags = ({ tags }: TagsProps) => {
  return (
    <ul>
      {tags.map((tag, uuid) => (
        <span
          key={`${uuid}-${tag}`}
          className="rounded-full p-1 bg-[#DCDEE7] mr-1 text-xs"
        >
          {tag}
        </span>
      ))}
    </ul>
  );
};

export default Tags;

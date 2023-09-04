interface StoresProps {
  stores: string[];
}

const Stores = ({ stores }: StoresProps) => {
  return (
    <div className="text-sm my-1">
      <p className="font-bold">✨ 추천 매장 목록 ✨</p>
      <p>{stores.join('\n')}</p>
    </div>
  );
};

export default Stores;

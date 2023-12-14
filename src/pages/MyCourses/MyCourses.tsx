import Header from '../../components/Commons/Header';

const MyCourses = () => {
  return (
    <div>
      <header>
        <Header showTitle={false} showBackButtonIcon={true} />
      </header>
      <div className="mx-32">
        <div className="flex space-x-4 items-start">
          <input
            type="text"
            className="my-4 p-2 w-[20vw] border-2 rounded-md"
            placeholder="목적지 키워드나 지명을 검색해보세요"
          />
          <input
            type="text"
            className="my-4 p-2 w-[20vw] border-2 rounded-md"
            placeholder="목적지 키워드나 지명을 검색해보세요"
          />
        </div>
        <div className="border-box my-4 p-4 w-full h-[500px] border-2 rounded-lg">
          <div className="text-2xl">내가 등록한 코스</div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

// react-kakao-maps-sdk 삭제해야할듯

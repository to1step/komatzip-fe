import { useEffect } from 'react';
import { CourseEntireInfo } from '@to1step/propose-backend';
import axiosInstance from '../../api/apiInstance';
// import PostModalMap from './PostModalMap';

// 코스의 매장목록을 클릭했을 때 출력되는 컴포넌트
// TODO : Stores 대신 uuid를 클릭하게 만들기
// TODO: post Modal을 사용하지 않는 것 확인 (기획에 해당 부분이 존재하지 않음) -> 필요시 다시 추가
interface CourseModalProps {
  closeModal: () => void;
  uuid: string | null;
  // courseUUID: string;
  // storeNames: { [key: string]: string[] };
  likeCount: CourseEntireInfo | number | undefined;
}

const CourseModal = ({ closeModal, uuid }: CourseModalProps) => {
  useEffect(() => {
    if (uuid) {
      axiosInstance
        .get<CourseEntireInfo>(`/v1/courses/${uuid}`)
        .then((response) => {
          if (response && response.data) {
            console.log('특정 코스 정보:', response.data);
          }
        })
        .catch((error) => {
          console.log('CourseModal 데이터 fetching 중 에러 발생: ', error);
        });
    }
  }, [uuid]);

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80">
      <article className="bg-white relative p-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <header className="flex">
          <h2 className="text-xl font-semibold mb-4">
            코스 이름 :
            {/* {courseInfo.storeNames ? (
              <Name name={courseInfo.name} storeNames={courseInfo.storeNames} />
            ) : (
              <Name name={courseInfo.name} />
            )} */}
          </h2>
          <p>
            좋아요 수 :{/* <LikeCount likeCount={courseInfo.likeCount} /> */}
          </p>
          {/* 
          <p>내가 좋아요 했는지 유무 : <ILike /> </p>
          <p>리뷰 수 :<ReviewCount /> </p>
          <p>
            공개 여부 : 기본값 비공개
            <IsPrivate />
          </p>  */}
        </header>
        <main className="flex">
          <section>
            <ul>태그들 :{/* <Tags /> */}</ul>
            <section className="opacity-70">
              <div
                className="w-[500px] h-[300px] bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/topcourse-bg04.jpg)' }}
              >
                <h3 className="text-center w-3/4 bg-amber-100 bg-opacity-90 text-white text-3xl">
                  <button className="font-black">
                    매장목록 :{/* <StoreNames /> */}
                  </button>
                </h3>
              </div>
            </section>
          </section>
          <section className="w-[500px] m-10">
            <section>
              <p>긴 코멘트 :{/* <LongComment /> */}</p>
              <p>짧은 코멘트 :{/* <ShortComment /> */}</p>
            </section>
            <section>
              <ul>
                <li>코스 첫 가게 :{/* <StartStore /> */}</li>
                <li>코스 마지막 가게 :{/* <EndStore /> */}</li>
                <li>추천 이용교통에 대한 코멘트 :{/* <Comment /> */}</li>
                <li>추천 이용교통 :{/* <TransPorts /> */}</li>
              </ul>
            </section>
            <section>
              <ul>
                코스리뷰들
                <li>코스 uuid</li>
                <li> {/* <User />{' '} */}</li>
                <li>리뷰우우우</li>
              </ul>
            </section>
          </section>
        </main>
      </article>
    </div>
  );
};

export default CourseModal;

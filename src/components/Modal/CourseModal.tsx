import { useEffect, useState } from 'react';
import { Course, Store, StoreEntireInfo } from '@to1step/propose-backend';
import PostModal from './PostModal';
import { CourseEntireInfo } from '@to1step/propose-backend';
import LongComment from '../Post/Course/LongComment';
import ShortComment from '../Post/Course/ShortComment';
import IsPrivate from '../Post/Course/IsPrivate';
import Stores from '../Post/Course/Stores';
import StoreNames from '../Post/Course/StoreNames';
import User from '../Post/Course/User';
import Name from '../Post/Name';
import Tags from '../Post/Tags';
import TransPorts from '../Post/Course/Transports';
import StartStore from '../Post/Course/StartStore';
import EndStore from '../Post/Course/EndStore';
import Comment from '../Post/Course/Comment';
import ReviewCount from '../Post/Course/ReviewCount';
import LikeCount from '../Post/Course/LikeCount';
import ILike from '../Post/Course/ILike';
import axiosInstance from '../../api/apiInstance';
// import PostModalMap from './PostModalMap';

// 코스의 매장목록을 클릭했을 때 출력되는 컴포넌트
// TODO : Stores 대신 uuid를 클릭하게 만들기

interface CourseModalProps {
  store: StoreEntireInfo | Store;
  courseInfo: CourseEntireInfo | Course;
  closeModal: () => void;
  uuid: string;
  courseUUID: string;
}

const CourseModal = ({
  closeModal,
  store,
  courseInfo,
  uuid,
  courseUUID,
}: CourseModalProps) => {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  useEffect(() => {
    if (uuid) {
      axiosInstance
        .get<CourseEntireInfo>(`/v1/courses/${courseUUID}`)
        .then((response) => {
          if (response && response.data) console.log(response.data);
        })
        .catch((error) => {
          console.log('CourseModal 데이터 fetching 중 에러 발생: ', error);
        });
    }
  }, [uuid, courseUUID]);

  const openStoreModal = () => {
    setIsStoreModalOpen(true);
  };

  const closeStoreModal = () => {
    setIsStoreModalOpen(false);
  };

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
            코스 이름 :{/* <Name name={name} /> */}
          </h2>
          <p>내가 좋아요 했는지 유무 :{/* <ILike /> */}</p>
          <p>리뷰 수 :{/* <ReviewCount /> */}</p>
          <p>좋아요 수 :{/* <LikeCount /> */}</p>
          <p>
            공개 여부 : 기본값 비공개
            {/* <IsPrivate /> */}
          </p>
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
                  <button onClick={openStoreModal} className="font-black">
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
                <li>{/* <User /> */}</li>
                <li>리뷰우우우</li>
              </ul>
            </section>
          </section>
        </main>
        {isStoreModalOpen && (
          <PostModal closeModal={closeStoreModal} store={store} />
        )}
      </article>
    </div>
  );
};

export default CourseModal;

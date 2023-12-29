import { useEffect } from 'react';
import { CourseEntireInfo } from '@to1step/propose-backend';
import axiosInstance from '../../api/apiInstance';

// 코스의 매장목록을 클릭했을 때 출력되는 컴포넌트
// TODO : Stores 대신 uuid를 클릭하게 만들기
interface CourseModalProps {
  closeModal: () => void;
  uuid: string | null;
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
          <h2 className="text-xl font-semibold mb-4">코스 모달입니다.</h2>
        </header>
        <main className="flex">
          <section>
            <ul>코스 모달 내용입니다.</ul>
            <section className="opacity-70">
              <div
                className="w-[500px] h-[300px] bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/topcourse-bg04.jpg)' }}
              ></div>
            </section>
          </section>
        </main>
      </article>
    </div>
  );
};

export default CourseModal;

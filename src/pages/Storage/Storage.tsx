import CourseModal from '../../components/Modal/CourseModal';
import { useState } from 'react';

const Storage = () => {
  // 코스 클릭시 나타나는 코스모달 구현중(임시 컴포넌트)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <h1>임시 작업 페이지입니다.</h1>
      <button onClick={openModal}>코스 모달로 가기</button>
      {isModalOpen && <CourseModal closeModal={closeModal} />}
    </section>
  );
};

export default Storage;

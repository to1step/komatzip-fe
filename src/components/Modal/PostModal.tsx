import { Store, StoreEntireInfo } from '@to1step/propose-backend';
// import PostModalMap from './PostModalMap';
import MiniMap from '../Kakaomap/MinMap';
import LikeButton from '../MapModal/LikeButton';
import CopyAddressButton from '../MapModal/CopyAddressButton';
import Tags from '../Post/Tags';
import { useRef, useEffect, useState } from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';
import ReviewList from '../MapModal/ReviewList';
// 매장 랭킹, 검색 결과의 매장을 클릭했을 때 출력되는 컴포넌트

interface PostModalProps {
  store: StoreEntireInfo | Store;
  closeModal: () => void;
}

const PostModal = ({ store, closeModal }: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [imageUploaderKey, setImageUploaderKey] = useState<number>(0);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={(event: React.MouseEvent) => {
        if (event.target === modalRef.current) {
          closeModal();
        }
      }}
      className="z-[1050] fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80"
    >
      <div className="bg-white w-[1000px] h-5/6 relative p-4 overflow-y-auto rounded-2xl">
        <button
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <div className="flex items-center mb-2">
          <h2 className="text-3xl font-semibold">{store?.name}</h2>
          <div className="ml-3 mt-3">
            <LikeButton markerInfo={store} />
          </div>
        </div>
        <p className="mb-2">{store.description}</p>
        <Tags tags={store?.tags} />
        <hr className="my-4 border-gray-200" />
        <div className="text-xl font-semibold mb-2">이용자 후기</div>
        <ReviewList markerInfo={store} />
        <hr className="my-4 border-gray-200 mt-6" />
        <div className="text-xl font-semibold mb-2">포토 후기</div>
        <ImageUploader
          key={imageUploaderKey}
          markerInfo={store}
          onImageChange={() => setImageUploaderKey((prevKey) => prevKey + 1)}
        />
        <hr className="my-4 border-gray-200" />
        <div className="flex items-center text-xl font-semibold mb-2">
          <div>위치</div>
          <div className="ml-2">
            <CopyAddressButton location={store.location} />
          </div>
          <div className="ml-2 text-gray-400 text-sm">{store.location}</div>
        </div>

        <MiniMap lat={store.coordinates[1]} lng={store.coordinates[0]} />
      </div>
    </div>
  );
};

export default PostModal;

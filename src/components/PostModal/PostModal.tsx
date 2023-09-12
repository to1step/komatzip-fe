import { StoreEntireInfo } from '@to1step/propose-backend';
import PostModalMap from './PostModalMap';

interface PostModalProps {
  store: StoreEntireInfo;
  closeModal: () => void;
}

const PostModal = ({ store, closeModal }: PostModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80">
      <div className="bg-white w-[500px] relative p-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">{store.name}</h2>
        <p className="mb-2">{store.description}</p>
        <p className="mb-2">카테고리: {store.category}</p>
        <p className="mb-2">태그: {store.tags.join(', ')}</p>
        <p className="mb-2">주소: {store.location}</p>
        <p className="mb-2">좌표:{store.coordinates}</p>
        <div>
          <PostModalMap coordinates={store.coordinates} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;

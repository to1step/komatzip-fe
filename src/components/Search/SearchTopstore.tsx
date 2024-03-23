import { useState, useCallback } from 'react';
import Image from '../../components/Post/Store/Image';
import Name from '../../components/Post/Name';
import Location from '../../components/Post/Store/Location';
import Description from '../../components/Post/Store/Description';
import Tags from '../../components/Post/Tags';
import { Store } from '@to1step/propose-backend';
import PostModal from '../Modal/PostModal';
import StoreCategory from '../Post/Store/StoreSymbol';
import ModalPortal from '../Modal/ModalPortal';

const SearchTopstore = ({ item }: { item: Store }) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (store: Store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setSelectedStore(null);
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <main
        key={`search-top-store-${item.uuid}`}
        className="bg-white my-3 cursor-pointer transition-all duration-300 ease-in-out transform shadow-lg hover:shadow-none w-full h-full"
        onClick={() => openModal(item)}
      >
        <section className="flex-row justify-center items-center max-h-[350px] max-w-72">
          <section>
            {item.representImage ? (
              <div className="rounded-2xl overflow-hidden p-2 flex justify-center items-center text-sm ">
                <Image
                  key={`search-top-store-image-${item.uuid}`}
                  representImage={item.representImage}
                />
              </div>
            ) : (
              <p className="w-fullpx-2 flex justify-center items-center text-sm text-gray-400">
                이미지가 아직 준비되지 않았어요!
              </p>
            )}
          </section>
          <section className="mx-3">
            <section className="flex-row items-center mb-2">
              <Name name={item.name} />
              <Location location={item.location} />
              <Description description={item.description} />
            </section>
            <section className="flex">
              <StoreCategory category={item.category} />
              <Tags tags={item.tags} />
            </section>
          </section>
        </section>
      </main>
      {isModalOpen && selectedStore && (
        <ModalPortal>
          <PostModal store={selectedStore} closeModal={closeModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default SearchTopstore;

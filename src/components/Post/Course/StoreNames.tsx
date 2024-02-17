import { CourseEntireInfo } from '@to1step/propose-backend';
import { useState } from 'react';
import CourseModal from '../../Modal/CourseModal';
import CategorySymbol from './CategorySymbol';
import { StoreCategory } from '@to1step/propose-backend/src/database/types/enums';
import ModalPortal from '../../Modal/ModalPortal';

interface StoreNamesProps {
  stores: (CourseEntireInfo & { category: StoreCategory })[] | string[];
  uuid: string;
}

const StoreNames = ({ stores, uuid }: StoreNamesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStoreUuid, setSelectedStoreUuid] = useState<string | null>(
    null,
  );
  const [likeCount, setLikeCount] = useState<CourseEntireInfo | number>();

  const openModal = () => {
    setSelectedStoreUuid(uuid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStoreUuid(null);
    setIsModalOpen(false);
  };

  return (
    <section className="relative flex-row justify-center items-center transition-all duration-300 ease-in-out transform  hover:ring-4 hover:ring-amber-500 hover:rounded-xl">
      {stores.map((store, index) => (
        <span
          key={typeof store === 'string' ? `string-${index}` : store.uuid}
          className="text-l relative cursor-pointer"
          onClick={() => {
            if (typeof store === 'string') {
              setLikeCount(likeCount);
              setSelectedStoreUuid(uuid);
              openModal();
            } else {
              const clickedStoreLikeCount = store.likeCount;
              const clickedStoreUuid = store.uuid;

              openModal();

              setLikeCount(clickedStoreLikeCount);
              setSelectedStoreUuid(clickedStoreUuid);
            }
          }}
        >
          <div className="absolute h-full border-l-8 border-orange-300 mx-2.5"></div>
          <div>
            <div className="relative h-12">
              {typeof store !== 'string' && (
                <>
                  <span className="absolute text-2xl">
                    <CategorySymbol category={store.category} />
                  </span>
                  <span className="ml-10">{store.name}</span>
                </>
              )}
            </div>
          </div>
        </span>
      ))}

      {isModalOpen && (
        <ModalPortal>
          <CourseModal
            closeModal={closeModal}
            uuid={selectedStoreUuid}
            likeCount={likeCount}
          />
        </ModalPortal>
      )}
    </section>
  );
};

export default StoreNames;

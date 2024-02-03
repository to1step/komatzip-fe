import { useSelector } from 'react-redux';
import { RootState } from '../../redux/module';
import axiosInstance from '../../api/apiInstance';
import { useEffect, useState } from 'react';
import { StoreEntireInfo } from '@to1step/propose-backend';

// 검색결과에서 보여질 내 가게
// 내가 좋아요(iLike)한 것들을 필터링해서 가져오기

const LikedStores = () => {
  const [iLikedStores, setILikedStores] = useState<StoreEntireInfo[]>([]);
  const searchResultsStore = useSelector(
    (state: RootState) => state.search.searchResultsStore,
  );

  useEffect(() => {
    let storeUUID = '';

    //storeUUID 동적으로 가져오기
    if (searchResultsStore.length > 0) {
      storeUUID = searchResultsStore[8].uuid;
    }

    axiosInstance
      .get(`v1/stores/${storeUUID}`)
      .then((response) => {
        const storeData = response.data;

        const iLikedStoresData = storeData.filter(
          (store: StoreEntireInfo) => store.iLike === true,
        );
        setILikedStores(iLikedStoresData);
      })
      .catch((error) => {
        console.error('내 매장 가져오는 중 에러 발생 :', error);
      });
  }, [searchResultsStore]);

  return (
    <section>
      <ul>
        {iLikedStores.map((store) => (
          <li key={store.uuid}>
            <p>{store.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LikedStores;

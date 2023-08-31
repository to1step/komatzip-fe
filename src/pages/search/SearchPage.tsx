import { useSelector } from 'react-redux';
import SearchTopcourse from '../../components/Search/SearchTopcourse';
import SearchTopstore from '../../components/Search/SearchTopstore';
import { Course, Store } from '@to1step/propose-backend';
import { RootState } from '../../redux/module';

// 검색 결과 페이지

// 예상 구현 방법
// 1. Search 컴포넌트에서 검색
// 2. searchResult로 검색 결과 상태 관리
// 3. SearchPage에서 검색 결과 상태를 가져오기
// 4. SearchResult에 검색 결과 상태(검색 단어) 출력
// 5. 결과의 각 컴포넌트에 상태 뿌려주기(매장,코스라 따로 뿌려줘야할듯 -> 어떻게?)
// 5-1. 어떻게? -> 코스 검색결과, 매장 검색결과를 각각 redux에 상태로 관리!

const SearchPage = () => {
  const searchResultsCourse = useSelector(
    (state: RootState) => state.search.searchResultsCourse,
  );
  const searchResultsStore = useSelector(
    (state: RootState) => state.search.searchResultsStore,
  );
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );

  return (
    <main>
      <section>
        <p>검색 결과 : {searchQuery}</p>
      </section>
      <section className="h-[491px] flex-row justify-center items-center">
        <h1 className="text-2xl font-semibold">TOP 매장</h1>
        <article className="flex">
          {searchResultsStore.map((item) => (
            <div key={item.uuid}>
              <SearchTopstore item={item as Store} />
            </div>
          ))}
        </article>
      </section>
      <section>
        <h1 className="text-2xl font-semibold">TOP 코스</h1>
        {searchResultsCourse.map((item) => (
          <div key={item.uuid}>
            <SearchTopcourse item={item as Course} />
          </div>
        ))}
      </section>
      <p>내 매장</p>
    </main>
  );
};

export default SearchPage;

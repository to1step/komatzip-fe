import React from 'react';
import { useSelector } from 'react-redux';
// import SearchResult from '../../components/Search/SearchResult';
import SearchTopcourse from '../../components/Search/SearchTopcourse';
import SearchTopstore from '../../components/Search/SearchTopstore';
import { CourseEntireInfo, StoreEntireInfo } from '@to1step/propose-backend';
import { RootState } from '../../redux/module';

// 검색 결과 페이지
// 예상 구현 방법
// 1. Search 컴포넌트에서 검색
// 2. searchResult로 검색 결과 상태 관리
// 3. SearchPage에서 검색 결과 상태를 가져오기
// 4. SearchResult에 검색 결과 상태(검색 단어) 출력
// 5. 결과의 각 컴포넌트에 상태 뿌려주기(매장,코스라 따로 뿌려줘야할듯 -> 어떻게?)

const SearchPage = () => {
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults,
  );
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );

  return (
    <main>
      <section>
        <p>검색 결과 : {searchQuery}</p>
      </section>
      <section>
        {searchResults.map((item) => (
          <div key={item.uuid}>
            <SearchTopstore item={item as StoreEntireInfo} />
          </div>
        ))}
      </section>
      <section>
        {searchResults.map((item) => (
          <div key={item.uuid}>
            <SearchTopcourse item={item as CourseEntireInfo} />
          </div>
        ))}
      </section>
      <p>내 매장</p>
    </main>
  );
};

export default SearchPage;

import { useSelector } from 'react-redux';
import SearchTopcourse from '../../components/Search/SearchTopcourse';
import SearchTopstore from '../../components/Search/SearchTopstore';
import { Course, Store } from '@to1step/propose-backend';
import { RootState } from '../../redux/module';
import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';

// 검색 결과 페이지

// 예상 구현 방법
// 1. Search 컴포넌트에서 검색
// 2. searchResult로 검색 결과 상태 관리
// 3. SearchPage에서 검색 결과 상태를 가져오기
// 4. SearchResult에 검색 결과 상태(검색 단어) 출력
// 5. 결과의 각 컴포넌트에 상태 뿌려주기(매장,코스라 따로 뿌려줘야할듯 -> 어떻게?)
// 5-1. 어떻게? -> 코스 검색결과, 매장 검색결과를 각각 redux에 상태로 관리!

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 지금 페이지
  const limit = 5; // 1페이지마다 몇 개의 포스트 보일지 결정

  const searchResultsStore = useSelector(
    (state: RootState) => state.search.searchResultsStore,
  );
  const searchResultsCourse = useSelector(
    (state: RootState) => state.search.searchResultsCourse,
  );
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );
  // 현재 페이지에 따라 표시할 아이템을 계산
  const offset = (currentPage - 1) * limit;

  // 각각의 검색 결과를 표시할 아이템 배열 생성
  const displayedStoreItems = searchResultsStore.slice(offset, offset + limit);
  const displayedCourseItems = searchResultsCourse.slice(
    offset,
    offset + limit,
  );

  const totalStoreItems = searchResultsStore.length;
  const totalCourseItems = searchResultsCourse.length;

  const totalPagesStore = Math.ceil(totalStoreItems / limit);
  const totalPagesCourse = Math.ceil(totalCourseItems / limit);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <main>
      <section>
        <p className="inline-block bg-gradient-to-t from-[#FFF743] via-transparent to-transparent">
          👩🏻‍💻 '{searchQuery}'의 검색결과입니다.
        </p>
      </section>
      <section>
        <h1 className="align-middle my-5 h-[30px] text-2xl font-semibold">
          🏆 매장 검색 결과
        </h1>
        <article className="flex">
          {displayedStoreItems.map((item) => (
            <div key={item.uuid}>
              <SearchTopstore item={item as Store} />
            </div>
          ))}
        </article>
        <Pagination
          currentPage={currentPage}
          totalItems={totalStoreItems}
          itemsPerPage={limit}
          totalPages={totalPagesStore}
          onPageChange={handlePageChange}
        />
      </section>
      <section>
        <h1 className="align-middle my-5 h-[30px] text-2xl font-semibold">
          🏆 코스 검색 결과
        </h1>
        <article className="flex m-1">
          {displayedCourseItems.map((item) => (
            <div key={item.uuid}>
              <SearchTopcourse item={item as Course} />
            </div>
          ))}
        </article>
        <Pagination
          currentPage={currentPage}
          totalItems={totalCourseItems}
          itemsPerPage={limit}
          totalPages={totalPagesCourse}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default SearchPage;

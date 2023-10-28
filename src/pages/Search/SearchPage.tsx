import { useSelector } from 'react-redux';
import SearchTopcourse from '../../components/Search/SearchTopcourse';
import SearchTopstore from '../../components/Search/SearchTopstore';
import { Course, Store } from '@to1step/propose-backend';
import { RootState } from '../../redux/module';
import Header from '../../components/Commons/Header';

// 검색 결과 페이지

const SearchPage = () => {
  // const [currentPage, setCurrentPage] = useState(1); // 지금 페이지
  // const limit = 5; // 1페이지마다 몇 개의 포스트 보일지 결정

  const searchResultsStore = useSelector(
    (state: RootState) => state.search.searchResultsStore,
  );
  const searchResultsCourse = useSelector(
    (state: RootState) => state.search.searchResultsCourse,
  );
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );
  // // 현재 페이지에 따라 표시할 아이템을 계산
  // const offset = (currentPage - 1) * limit;

  // // 각각의 검색 결과를 표시할 아이템 배열 생성
  // const displayedStoreItems = searchResultsStore.slice(offset, offset + limit);
  // const displayedCourseItems = searchResultsCourse.slice(
  //   offset,
  //   offset + limit,
  // );

  // const totalStoreItems = searchResultsStore.length;
  // const totalCourseItems = searchResultsCourse.length;

  // const totalPagesStore = Math.ceil(totalStoreItems / limit);
  // const totalPagesCourse = Math.ceil(totalCourseItems / limit);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };
  return (
    <main>
      <Header showTitle={true} showBackButtonIcon={true} />
      <section className="text-center">
        <p className="inline-block bg-gradient-to-t from-[#FFF743] via-transparent to-transparent">
          👩🏻‍💻 '{searchQuery}'의 검색결과입니다.
        </p>
      </section>
      <section>
        <h1 className="text-center mb-12  mt-10 h-[30px] text-4xl font-bold">
          매장 검색 결과
        </h1>
        <article className="flex flex-wrap">
          {searchResultsStore.map((item) => (
            <div key={item.uuid} className="w-1/5 flex justify-center">
              <SearchTopstore item={item as Store} />
            </div>
          ))}
        </article>
        {/* <Pagination
          currentPage={currentPage}
          totalItems={totalStoreItems}
          itemsPerPage={limit}
          totalPages={totalPagesStore}
          onPageChange={handlePageChange}
        /> */}
      </section>
      <section>
        <h1 className="text-center mb-12 mt-20 h-[30px] text-4xl font-bold">
          코스 검색 결과
        </h1>
        <article className="flex flex-wrap">
          {searchResultsCourse.map((item) => (
            <div key={item.uuid} className="w-1/4 flex justify-center">
              <SearchTopcourse item={item as Course} uuid={item.uuid} />
            </div>
          ))}
        </article>
        {/* <Pagination
          currentPage={currentPage}
          totalItems={totalCourseItems}
          itemsPerPage={limit}
          totalPages={totalPagesCourse}
          onPageChange={handlePageChange}
        /> */}
      </section>
    </main>
  );
};

export default SearchPage;

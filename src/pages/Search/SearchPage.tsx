import { useSelector } from 'react-redux';
import SearchTopstore from '../../components/Search/SearchTopstore';
import { Store } from '@to1step/propose-backend';
import { RootState } from '../../redux/module';
import Header from '../../components/Commons/Header';

// 검색 결과 페이지

const SearchPage = () => {
  // const [currentPage, setCurrentPage] = useState(1); // 지금 페이지
  // const limit = 5; // 1페이지마다 몇 개의 포스트 보일지 결정

  const searchResultsStore = useSelector(
    (state: RootState) => state.search.searchResultsStore,
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
      <Header
        showTitle={true}
        showBackButtonIcon={true}
        showSearch={true}
        showHamburgerButton={true}
      />
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
            <div key={item.uuid} className="w-1/2 md:w-1/5 flex justify-center">
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
    </main>
  );
};

export default SearchPage;

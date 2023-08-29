import React from 'react';
import { useSelector } from 'react-redux';
import SearchResult from '../../components/Search/SearchResult';
import SearchTopcourse from '../../components/Search/SearchTopcourse';
import SearchTopstore from '../../components/Search/SearchTopstore';

// 검색 결과 페이지

const SearchPage = () => {
  const searchResults = useSelector((state) => state.search.searchResults);

  return (
    <>
      <SearchResult results={searchResults} />
      <SearchTopstore results={searchResults} />
      <SearchTopcourse results={searchResults} />
      <p>내 매장</p>
    </>
  );
};

export default SearchPage;

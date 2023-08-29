import React from 'react';
import { useSelector } from 'react-redux';
import SearchResult from '../../components/Search/SearchResult';
import SearchTopcourse from '../../components/Search/SearchTopcourse';
import SearchTopstore from '../../components/Search/SearchTopstore';

// 검색 결과 페이지

const SearchPage = () => {
  return (
    <>
      <p>
        <SearchResult />
      </p>
      <p>
        <SearchTopstore />
      </p>
      <p>
        <SearchTopcourse />
      </p>
      <p>내 매장</p>
    </>
  );
};

export default SearchPage;

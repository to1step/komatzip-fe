import React from 'react';

const Search = () => {
  return (
    <div className="flex">
      <input
        id="searchInput"
        type="text"
        placeholder="목적지 키워드나 지명을 검색해보세요"
        className="flex-shrink-0 w-558 h-49 p-4"
      />
      <button type="submit" className="flex-shrink-0 w-94 h-49 p-4">
        검색
      </button>
      <p>
        <button type="button" className="flex-shrink-0 w-94 h-49 p-4">
          내 위치로 찾기
        </button>
      </p>
    </div>
  );
};

export default Search;

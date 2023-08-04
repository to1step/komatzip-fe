import React from 'react';

const Search = () => {
  return (
    <div>
      <input
        id="searchInput"
        type="text"
        placeholder="목적지 키워드나 지명을 검색해보세요"
      />
      <button type="submit">검색</button>
      <p>
        <button type="button">내 위치로 찾기</button>
      </p>
    </div>
  );
};

export default Search;

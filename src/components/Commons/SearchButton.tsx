import React from 'react';

// 검색버튼
type Props = {
  onClick?: () => void;
};

const SearchButton = (props: Props) => {
  return (
    <button onClick={props.onClick} className="bg-transparent border-none">
      Search
    </button>
  );
};

export default SearchButton;

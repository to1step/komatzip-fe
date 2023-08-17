import React from 'react';

// 검색버튼
type Props = {
  onClick?: () => void;
};

const SearchButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="h-[40px] w-[80px] text-sm bg-gray-100 border-none focus:outline-none hover:bg-gray-200"
    >
      Search
    </button>
  );
};

export default SearchButton;

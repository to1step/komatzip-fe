import React from 'react';

// 검색버튼
type Props = {
  onClick?: () => void;
};

const SearchButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="h-[40px] text-sm bg-gray border-none rounded"
    >
      Search
    </button>
  );
};

export default SearchButton;

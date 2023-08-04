import React, { FormEvent, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setValidationError('목적지나 지명이 입력되지 않았어요!');
      return;
    }

    console.log('입력된 검색어:', inputValue);
    setInputValue('');
    setValidationError('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <input
          id="searchInput"
          type="text"
          placeholder="목적지 키워드나 지명을 검색해보세요"
          className="flex-shrink-0 w-558 h-49 p-4"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="flex-shrink-0 w-94 h-49 p-4">
          검색
        </button>
        {validationError && <p className="text-red-500">{validationError}</p>}
        <p>
          <Link
            to="/mappage"
            type="button"
            className="flex-shrink-0 w-94 h-49 p-4"
          >
            내 위치로 찾기
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Search;

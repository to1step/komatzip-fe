import React, { useState, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

type Props = {
  name: string;
  value: string;
  type?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 입력창에 focus가 되지 않았을 때
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputBox = (props: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [, setValidationError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setValidationError('목적지나 지명이 입력되지 않았어요!');
      return;
    }

    setInputValue('');
    setValidationError('');
  };

  return (
    <form className="flex relative" onSubmit={handleSubmit}>
      <input
        className="w-60 md:w-80 lg:w-96 h-10 border-orange-600 text-sm placeholder-left px-5 border-2 border-r-0 rounded-r-none md:rounded-r-2xl rounded-l-none focus:outline-none"
        name={props.name}
        type={props.type || 'text'}
        onClick={props.onClick}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        onKeyPress={props.onKeyPress}
        placeholder="검색 타입을 선택 후 찾고싶은 태그나 매장 이름을 입력해주세요."
      />
      <button
        type="submit"
        className="w-10 h-10 border-2 bg-white text-orange-800 border-orange-600 md:hidden border-l-0 rounded-l-none rounded-r-2xl flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default InputBox;

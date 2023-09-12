import React, { useState, ChangeEvent, FormEvent } from 'react';

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

  // console.log(validationError, handleSubmit, handleChange);

  return (
    <div>
      <input
        className=" w-[675px] h-[40px] border-orange-600 text-sm placeholder-left px-5 border-2 rounded-r-full rounded-l-none focus:outline-none"
        name={props.name}
        type={props.type || 'text'}
        onClick={props.onClick}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        onKeyPress={props.onKeyPress}
        placeholder="검색 타입을 선택 후 찾고싶은 태그나 매장 이름을 입력해주세요."
      />
    </div>
  );
};

export default InputBox;
// 소분화즁

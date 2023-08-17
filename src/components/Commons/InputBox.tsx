import React, { useState, ChangeEvent } from 'react';

type Props = {
  name: string;
  value: string;
  type?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 입력창에 focus가 되지 않았을 때
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

  return (
    <div className="w-858 h-49">
      <input
        name={props.name}
        type={props.type || 'text'}
        onClick={props.onClick}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        placeholder="목적지나 지명을 입력하세요."
      />
    </div>
  );
};

export default InputBox;
// 소분화즁

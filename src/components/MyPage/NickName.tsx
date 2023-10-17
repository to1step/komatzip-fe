import { useState } from 'react';
import axiosInstance from '../../api/apiInstance';

const NickName = ({ nickname }: { nickname: string }) => {
  const [editing, setEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedNickname(nickname);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch('/v1/users/me', {
        nickname: editedNickname,
      });

      if (response.status === 200) {
        setEditing(false);
      } else {
        console.error('😥 닉네임 변경 실패 :', response);
      }
    } catch (error) {
      console.error('😥 닉네임 변경 실패 :', error);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNickname(e.target.value);
  };

  return (
    <ul>
      <li className="list-none flex">
        {editing ? (
          <>
            닉네임
            <input
              type="text"
              value={editedNickname}
              onChange={handleNicknameChange}
              className="border-b-2 w-3/4"
            />
          </>
        ) : (
          <>닉네임 : {nickname}</>
        )}
      </li>
      <li className="list-none">
        {editing ? (
          <>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancel}>취소</button>
          </>
        ) : (
          <button className="underline" onClick={handleEdit}>
            수정
          </button>
        )}
      </li>
    </ul>
  );
};

export default NickName;

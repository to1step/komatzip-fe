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
        commentAlarm: commentAlarm,
        updateAlarm: updateAlarm,
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
    <ul className="flex-row">
      <li className="list-none">
        {editing ? (
          <div className="text-xl font-semibold flex">
            닉네임
            <input
              type="text"
              value={editedNickname}
              onChange={handleNicknameChange}
              className="border-b-2"
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        ) : (
          <div className="text-xl font-semibold">
            닉네임 : {nickname}
            <button onClick={handleEdit}>수정</button>
          </div>
        )}
      </li>
    </ul>
  );
};

export default NickName;

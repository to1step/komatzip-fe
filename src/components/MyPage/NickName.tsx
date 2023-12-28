import { useState } from 'react';
import axiosInstance from '../../api/apiInstance';

const NickName = ({
  nickname,
  commentAlarm,
  updateAlarm,
}: {
  nickname: string;
  commentAlarm: boolean;
  updateAlarm: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname);
  const [updateSuccess, setUpdateSuccess] = useState(true);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdateSuccess(true);
    setEditedNickname(nickname);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch('/v1/users/me', {
        nickname: editedNickname,
        commentAlarm,
        updateAlarm,
      });

      if (response.status === 200) {
        setEditing(false);
        setUpdateSuccess(true);
      } else {
        console.error('😥 닉네임 변경 실패 :', response);
        setUpdateSuccess(false);
      }
    } catch (error) {
      console.error('😥 닉네임 변경 실패 :', error);
      setUpdateSuccess(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNickname(e.target.value);
  };

  return (
    <ul className="flex-row">
      <li className="list-none">
        {editing && updateSuccess ? (
          <div className="flex">
            <p className="font-semibold text-xl">닉네임</p>
            <input
              type="text"
              value={editedNickname}
              onChange={handleNicknameChange}
              className="border-b-2 ml-20 mr-4"
              placeholder="수정할 닉네임을 입력하세요"
            />
            <button onClick={handleSave} className="mx-2">
              저장
            </button>
            <button onClick={handleCancel} className="mx-1">
              취소
            </button>
          </div>
        ) : (
          <div className="text-xl font-semibold">
            닉네임 : {editing ? editedNickname : nickname}
            <button onClick={handleEdit}>수정</button>
          </div>
        )}
      </li>
    </ul>
  );
};

export default NickName;

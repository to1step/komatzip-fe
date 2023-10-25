import { IoNotificationsOutline } from 'react-icons/io5';
import axiosInstance from '../../api/apiInstance';
import { useState } from 'react';

interface EmailNotificationProps {
  commentAlarm: boolean;
  updateAlarm: boolean;
  onCommentAlarmToggle: (newState: boolean) => void;
  onUpdateAlarmToggle: (newState: boolean) => void;
}

const EmailNotification = ({
  commentAlarm,
  updateAlarm,
  onCommentAlarmToggle,
  onUpdateAlarmToggle,
}: EmailNotificationProps) => {
  const [editedCommentAlarm, setEditedCommentAlarm] = useState(commentAlarm);
  const [editedUpdateAlarm, setEditedUpdatedAlarm] = useState(updateAlarm);

  const toggleCommentAlarm = () => {
    onCommentAlarmToggle(!editedCommentAlarm);
    setEditedCommentAlarm(!editedCommentAlarm);
    ToggleSave({
      commentAlarm: editedCommentAlarm,
    });
  };

  const toggleUpdateAlarm = () => {
    onUpdateAlarmToggle(!editedUpdateAlarm);
    setEditedUpdatedAlarm(!editedUpdateAlarm);
    ToggleSave({ updataAlarm: editedUpdateAlarm });
  };

  const ToggleSave = async (payload: {
    commentAlarm: boolean;
    updataAlarm: newUpdataAlarmState;
  }) => {
    try {
      const response = await axiosInstance.patch('/v1/users/me', {
        payload,
      });

      if (response.status === 200) {
        console.error('🌼 알림 상태 변경 성공 :', response);
      } else {
        console.error('😥 알림 상태 변경 실패 :', response);
      }
    } catch (error) {
      console.error('😥 알림 상태 변경 실패 :', error);
    }
  };

  return (
    <section className="flex border-b">
      <IoNotificationsOutline size={26} />
      <h1 className="text-xl font-semibold mr-8">이메일 수신 설정</h1>
      <div className="flex-row">
        <div className="flex items-center my-2">
          <li className="mr-40">댓글 알림</li>
          <li className="ml-2 relative inline-block w-10 h-6 align-middle select-none transition-transform duration-300 ease-in-out">
            <input
              type="checkbox"
              checked={editedCommentAlarm}
              onChange={toggleCommentAlarm}
              className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer ${
                commentAlarm
                  ? 'bg-blue-200 border-blue-400 transform translate-x-full'
                  : 'bg-gray-200 border-gray-400 transform translate-x-0'
              }`}
            />
            <label
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-bg duration-300 ${
                commentAlarm ? 'bg-blue-200' : 'bg-gray-300'
              }`}
            ></label>
          </li>
        </div>
        <div className="flex items-center">
          <li className="mr-32">업데이트 소식</li>
          <li className="ml-2 relative inline-block w-10 h-6 align-middle select-none transition-transform duration-300 ease-in-out">
            <input
              type="checkbox"
              checked={editedUpdateAlarm}
              onChange={toggleUpdateAlarm}
              className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer ${
                editedUpdateAlarm
                  ? 'bg-blue-200 border-blue-400 transform translate-x-full'
                  : 'bg-gray-200 border-gray-400 transform translate-x-0'
              }`}
            />
            <label
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-bg duration-300 ${
                editedUpdateAlarm ? 'bg-blue-200' : 'bg-gray-300'
              }`}
            ></label>
          </li>
        </div>
      </div>
    </section>
  );
};

export default EmailNotification;

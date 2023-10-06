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
  const toggleCommentAlarm = () => {
    const newCommentAlarm = !commentAlarm;
    // 토글 스위치 클릭 시 서버로 값을 전송
    onCommentAlarmToggle(newCommentAlarm);
  };

  const toggleUpdateAlarm = () => {
    const newUpdateAlarm = !updateAlarm;
    // 토글 스위치 클릭 시 서버로 값을 전송
    onUpdateAlarmToggle(newUpdateAlarm);
  };

  return (
    <section className="flex border-b">
      <h1 className="font-black w-1/4 my-2 ">이메일 수신 설정</h1>
      <div className="flex-row">
        <div className="flex items-center my-2">
          <li className="mr-40">댓글 알림</li>
          <li className="ml-2 relative inline-block w-10 h-6 align-middle select-none transition-transform duration-300 ease-in-out">
            <input
              type="checkbox"
              checked={commentAlarm}
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
              checked={updateAlarm}
              onChange={toggleUpdateAlarm}
              className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer ${
                updateAlarm
                  ? 'bg-blue-200 border-blue-400 transform translate-x-full'
                  : 'bg-gray-200 border-gray-400 transform translate-x-0'
              }`}
            />
            <label
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-bg duration-300 ${
                updateAlarm ? 'bg-blue-200' : 'bg-gray-300'
              }`}
            ></label>
          </li>
        </div>
      </div>
    </section>
  );
};

export default EmailNotification;

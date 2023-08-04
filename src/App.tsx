import './App.css';
import {User} from '@to1step/propose-backend';
function App() {
  const a: User = {
    uuid: '1234',
    email: '1234',
    password: '1234',
    nickname: '1234',
    provider: '1234',
    snsId: '1234',
    profileImage: '1234',
    commentAlarm: false,
    updateAlarm: true,
  };
  console.log(a);
  return (
    <div>
      <h1>Vite + React</h1>
    </div>
  );
}

export default App;

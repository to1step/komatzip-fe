import './App.css';
import { User } from '@to1step/propose-backend';
import { Route, Routes } from 'react-router-dom';
import Post from './pages/post/Post';
import Topstore from './components/rank/Topstore';
import StartPage from './pages/startpage/StartPage';

function App() {
  return (
    <>
      <h1>코맛집</h1>
      <Routes>
        <Route path="/" element={<Topstore />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;

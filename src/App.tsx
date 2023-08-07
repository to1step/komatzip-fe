import './App.css';
import { User } from '@to1step/propose-backend';
import { Route, Routes, Link } from 'react-router-dom';
import Post from './pages/post/Post';
import Topstore from './components/rank/Topstore';
import Search from './components/search/Search';
import KakaoMap from './components/KakaoMap';
function App() {
  return (
    <>
      <Link to="/">진짜 한국</Link>
      <Search />
      <Routes>
        <Route path="/" element={<Topstore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mappage" element={<KakaoMap />} />
      </Routes>
    </>
  );
}

export default App;

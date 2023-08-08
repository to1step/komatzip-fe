import './App.css';
import { User } from '@to1step/propose-backend';
import { Route, Routes, Link } from 'react-router-dom';
import Post from './pages/post/Post';
import Search from './components/Search/Search';
import Topstore from './components/rank/Topstore';

function App() {
  return (
    <>
      <Link to="/">진짜 한국</Link>
      <Search />
      <Routes>
        <Route path="/" element={<Topstore />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;

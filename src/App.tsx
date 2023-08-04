import './App.css';
import { User } from '@to1step/propose-backend';
import { Route, Routes, Link } from 'react-router-dom';
import Post from './pages/post/Post';
import Topstore from './components/Rank/Topstore';
import Search from './components/Search/Search';
import Tags from './components/Post/Tags';

function App() {
  return (
    <>
      <Link to="/">진짜 한국</Link>
      <Search />
      <Tags />
      <Routes>
        <Route path="/" element={<Topstore />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;

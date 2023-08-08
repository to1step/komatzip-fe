import './App.css';
import { User } from '@to1step/propose-backend';
import { Route, Routes, Link } from 'react-router-dom';
import Post from './pages/post/Post';
import Search from './components/Search/Search';
import Tags from './components/Post/Tags';
import Description from './components/Post/Description';

function App() {
  return (
    <>
      <Link to="/">진짜 한국</Link>
      <Search />
      <Tags />
      <Description />
      <Routes>
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;

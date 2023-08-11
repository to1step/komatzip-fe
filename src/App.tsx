import { User } from '@to1step/propose-backend';
import { Route, Routes, Link } from 'react-router-dom';
import Post from './pages/post/Post';
import Topstore from './components/rank/Topstore';
import Search from './components/Search/Search';
import MapPage from './pages/MapPage';
function App() {
  return (
    <>
      <Link to="/" className="text-3xl font-bold">
        진짜 한국
      </Link>
      <Search />
      <Routes>
        <Route path="/" element={<Topstore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mappage" element={<MapPage />} />
      </Routes>
    </>
  );
}

export default App;

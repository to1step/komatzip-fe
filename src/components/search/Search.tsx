import { Route, Routes, Link } from 'react-router-dom';
import InputBox from '../Commons/InputBox';
import SearchButton from '../Commons/SearchButton';
import ConnectToMap from '../Commons/ConnectToMap';

const Search = () => {
  return (
    <>
      <div className="w-1000 h-82 flex items-center">
        <InputBox />
        <SearchButton />
      </div>
      <div>
        <Link to="/mappage">
          <ConnectToMap />
        </Link>
      </div>
    </>
  );
};

export default Search;

import { Route, Routes, Link } from 'react-router-dom';
import InputBox from '../Commons/InputBox';
import SearchButton from '../Commons/SearchButton';
import ConnectToMap from '../Commons/ConnectToMap';

const Search = () => {
  return (
    <div className="h-[182px]">
      <div className="flex justify-center items-center">
        <InputBox />
        <div className="p-[15px]">
          <SearchButton />
        </div>
      </div>
      <div>
        <Link to="/mappage">
          <ConnectToMap />
        </Link>
      </div>
    </div>
  );
};

export default Search;

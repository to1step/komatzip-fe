import { Route, Routes, Link } from 'react-router-dom';
import InputBox from '../Commons/InputBox';
import SearchButton from '../Commons/SearchButton';
import ConnectToMap from '../Commons/ConnectToMap';

const Search = () => {
  return (
    <div className="flex-row justify-center items-center w-screen ">
      <div className="flex justify-center items-center">
        <InputBox />
        <div className="p-[15px]">
          <SearchButton />
        </div>
      </div>
      <div className="mx-[480px]">
        <Link to="/mappage">
          <ConnectToMap />
        </Link>
      </div>
    </div>
  );
};

export default Search;

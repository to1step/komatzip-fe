import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const Header = () => {
  return (
    <header>
      <nav className="flex-row justify-center items-center">
        <div className="flex-row justify-between items-center">
          <div className="flex justify-end mb-3">
            <Link
              to="/login"
              className="text-xl my-[30px] mx-[70px] text-orange-200 font-semibold hover:text-orange-900"
            >
              Login
            </Link>
          </div>
          <h1 className="text-center mb-10">
            <Link
              to="/"
              className="text-7xl font-bold text-orange-200 font-custom-snow-crab"
            >
              여기가 수도권
            </Link>
          </h1>
        </div>
        <Search />
      </nav>
    </header>
  );
};

export default Header;

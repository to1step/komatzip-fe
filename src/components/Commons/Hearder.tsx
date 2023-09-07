import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const Header = () => {
  return (
    <header>
      <nav className="flex-row justify-between items-center">
        <div className="flex">
          <h1>
            <Link
              to="/"
              className="text-4xl font-bold text-black hover:text-black"
            >
              코맛집
            </Link>
          </h1>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/login"
                className="text-xl font-semibold hover:text-gray-500"
              >
                로그인
              </Link>
            </li>
          </ul>
        </div>
        <form>
          <Search />
        </form>
      </nav>
    </header>
  );
};

export default Header;

import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Props의 타입을 명시적으로 지정
type SideBarProps = {
  onClose: () => void;
};

function SideBar({ onClose }: SideBarProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed z-20 top-0 right-0 h-full w-64 bg-black text-white shadow-md bg-opacity-60">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-0">@@님</h2>
        <div>
          <FaTimes
            className="text-2xl cursor-pointer text-white hover:text-blue-500"
            onClick={handleClose}
          />
        </div>
      </div>

      <div className="p-4">
        <ul>
          <li className="mb-2">
            <Link to="/">My Courses</Link>
          </li>
          <li className="mb-2">
            <Link to="/">About Me</Link>
          </li>
          <li className="mb-2">
            <Link to="/">따라란</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

import { useState } from 'react';

const MenuBar = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div
      className="
                absolute
                z-1
                top-8
                right-12
                cursor-pointer
              "
    >
      {!login ? <img src="/menu.svg" alt="menu" /> : 'Login'}
    </div>
  );
};

export default MenuBar;

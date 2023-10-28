const MenuBar = () => {
  const login = false;

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

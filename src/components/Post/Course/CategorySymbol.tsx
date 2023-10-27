interface CategorySymbolProps {
  category: number;
}

const CategorySymbol = ({ category }: CategorySymbolProps) => {
  let categoryString;

  switch (category) {
    case 0:
      categoryString = '☕';
      break;
    case 1:
      categoryString = '🥞';
      break;
    case 2:
      categoryString = '⛲';
      break;
    default:
      categoryString = '✨';
      break;
  }

  return <span className="absolute text-[23px]">{categoryString}</span>;
};

export default CategorySymbol;

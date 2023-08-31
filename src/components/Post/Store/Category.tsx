import { StoreCategory } from '@to1step/propose-backend/src/database/types/enums';

interface CategoryProps {
  category: StoreCategory;
}

const Category = ({ category }: CategoryProps) => {
  let categoryName = '';

  switch (category) {
    case StoreCategory.CAFE:
      categoryName = '카페';
      break;
    case StoreCategory.RESTAURANT:
      categoryName = '레스토랑';
      break;
    case StoreCategory.PARK:
      categoryName = '공원';
      break;
    default:
      categoryName = '알 수 없음';
  }
  return (
    <div className="rounded-full p-1 bg-blue-200">
      <article className="text-xs">
        <p>{categoryName}</p>
      </article>
    </div>
  );
};

export default Category;

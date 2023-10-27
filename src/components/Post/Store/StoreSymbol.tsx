import { StoreCategory } from '@to1step/propose-backend/src/database/types/enums';

// 매장 Post에 보이는 카테고리 / 태그랑 함께 사용중

interface StoreCategoryProps {
  category: StoreCategory;
}

const StorePostCategory = ({ category }: StoreCategoryProps) => {
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
    <span className="w-fit rounded-full mr-1 p-1 bg-blue-200 text-xs">
      {categoryName}
    </span>
  );
};

export default StorePostCategory;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/apiInstance';
import { Rank } from '../../type';

interface CategoryProps {
  category: number;
}

const Category = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<Rank[]>(
        `https://api.to1step.shop/v1/rank?type=store&region=서울시%20송파구`,
      );
      const responseData = response.data;
      console.log(responseData);

      if (Array.isArray(responseData.data)) {
        const processData: CategoryProps[] = responseData.data.map(
          (rank: Rank) => ({
            category: rank.category,
          }),
        );
        setCategories((prevCategory) => [...prevCategory, ...processData]);
      } else {
        console.error('데이터는 배열이 아니였다! 그 이유는', responseData.data);
      }
    } catch (error) {
      console.log('에러:', error);
    }
  };

  return (
    <div>
      {categories.map((categoryList, listIndex) => (
        <article key={listIndex}>
          <p className="w-10 h-22 text-white text-center text-xs font-normal rounded-2xl bg-red-500">
            {categoryList.category}
          </p>
        </article>
      ))}
    </div>
  );
};

export default Category;

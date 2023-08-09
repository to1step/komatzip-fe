import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Komatzip } from '../../type';

interface TagsProps {
  tags: string[];
}

const Tags = () => {
  const [tags, setTags] = useState<TagsProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Komatzip[]>(
        `https://api.to1step.shop/v1/rank?type=store&region=서울시%20송파구`,
      );
      const responseData = response.data;

      if (Array.isArray(responseData.data)) {
        const processData: TagsProps[] = responseData.data.map(
          (komatzip: Komatzip) => ({
            tags: komatzip.tags,
          }),
        );
        setTags((prevTags) => [...prevTags, ...processData]);
      } else {
        console.error('데이터는 배열이 아니였다! 그 이유는', responseData.data);
      }
    } catch (error) {
      console.log('에러:', error);
    }
  };

  const sortTagsAscending = (tagsArray: string[]) => {
    return tagsArray.slice().sort();
  };

  return (
    <div>
      {tags.map((tagList, listIndex) => (
        <article
          key={listIndex}
          className="flex justify-center items-center flex-shrink-0 "
        >
          {sortTagsAscending(tagList.tags).map((singleTag, tagIndex) => (
            <p
              key={tagIndex}
              className="flex justify-center flex-shrink-0 w-20 h-22 text-white text-center text-xs font-normal rounded-3xl bg-blue-500"
            >
              #{singleTag}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
};

export default Tags;

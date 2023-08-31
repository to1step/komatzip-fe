import React from 'react';
import Image from '../../components/Post/Store/Image';
import Name from '../../components/Post/Name';
import Location from '../../components/Post/Store/Location';
import Description from '../../components/Post/Store/Description';
import Category from '../../components/Post/Store/Category';
import Tags from '../../components/Post/Tags';

const SearchTopcourse = ({ item }) => {
  return (
    <main>
      <section>
        {item.representImage ? (
          <Image representImage={item.representImage} />
        ) : (
          <p className="w-[292px] h-[210px] flex justify-center items-center text-sm">
            이미지가 아직 준비되지 않았어요!
          </p>
        )}
        <Name name={item.name} />
        <Location location={item.location} />
        <Description description={item.description} />
        <Category category={item.category} />
        <Tags tags={item.tags} />
      </section>
    </main>
  );
};

export default SearchTopcourse;

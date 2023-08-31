import React from 'react';
import Image from '../../components/Post/Store/Image';
import Name from '../../components/Post/Name';
import Location from '../../components/Post/Store/Location';
import Description from '../../components/Post/Store/Description';
import Category from '../../components/Post/Store/Category';
import Tags from '../../components/Post/Tags';

const SearchTopstore = ({ item }) => {
  return (
    <main>
      <section className="flex-row justify-center items-center w-[296px] h-[374px]">
        <section>
          {item.representImage ? (
            <Image representImage={item.representImage} />
          ) : (
            <p className="w-[292px] h-[210px] text-sm">
              이미지가 아직 준비되지 않았어요!
            </p>
          )}
        </section>
        <section>
          <section className="flex-row items-center  w-[296px] h-[98px]">
            <Name name={item.name} />
            <Location location={item.location} />
            <Description description={item.description} />
          </section>
          <section className="flex">
            <Category category={item.category} />
            <Tags tags={item.tags} />
          </section>
        </section>
      </section>
    </main>
  );
};

export default SearchTopstore;

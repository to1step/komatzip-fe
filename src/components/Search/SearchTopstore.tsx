import Image from '../../components/Post/Store/Image';
import Name from '../../components/Post/Name';
import Location from '../../components/Post/Store/Location';
import Description from '../../components/Post/Store/Description';
import Category from '../../components/Post/Store/Category';
import Tags from '../../components/Post/Tags';
import { Store } from '@to1step/propose-backend';

const SearchTopstore = ({ item }: { item: Store }) => {
  return (
    <main
      key={`search-top-store-${item.uuid}`}
      className="cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg hover:rounded-xl"
    >
      <section className="flex-row justify-center items-center w-[296px] h-[374px]">
        <section>
          {item.representImage ? (
            <Image
              key={`search-top-store-image-${item.uuid}`}
              representImage={item.representImage}
            />
          ) : (
            <p className="w-[292px] h-[210px] flex justify-center items-center text-sm">
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

import Name from '../../components/Post/Name';
import Tags from '../../components/Post/Tags';
import ShortComment from '../Post/Course/ShortComment';
import User from '../Post/Course/User';
import { Course } from '@to1step/propose-backend';
import StoreNames from '../Post/Course/StoreNames';

const SearchTopcourse = ({ item, uuid }: { item: Course; uuid: string }) => {
  return (
    <article>
      <div className="bg-blue-100 bg-opacity-30">
        <section className="flex flex-col justify-center items-center">
          <section className=" mt-5 text-amber-200">
            <div className="flex justify-start items-center my-4">
              <div>
                <Name name={item.name} />
              </div>
              <div className="ml-10">
                <Tags tags={item.tags} />
              </div>
            </div>
            <div className="flex justify-start items-center">
              <User user={item.user} />
            </div>
            <ShortComment shortComment={item.shortComment} />
          </section>
          <section className="w-4/5 h-[250px] m-8 bg-white bg-opacity-60 rounded-[25px] flex flex-col justify-center items-center">
            <section className="w-3/4">
              <StoreNames stores={item.stores} uuid={uuid} />
            </section>
          </section>
        </section>
      </div>
    </article>
  );
};

export default SearchTopcourse;

import Name from '../../components/Post/Name';
import Tags from '../../components/Post/Tags';
import ShortComment from '../Post/Course/ShortComment';
import User from '../Post/Course/User';
import TransPorts from '../Post/Course/Transports';
import { Course } from '@to1step/propose-backend';
import LongComment from '../Post/Course/LongComment';
import Stores from '../Post/Course/Stores';

const SearchTopcourse = ({ item }: { item: Course }) => {
  return (
    <article>
      <div className="bg-blue-100 bg-opacity-30">
        <section className="flex flex-col justify-center items-center">
          <section className="m-5 text-amber-100 text-left">
            <div>
              <Name name={item.name} />
            </div>
            <div className="">
              <User user={item.user} />
            </div>
            <Tags tags={item.tags} />
          </section>
          <section className="w-3/5 h-[300px] m-8 bg-white bg-opacity-60 rounded-[25px] flex flex-col justify-center items-center">
            <section className="mb-10 text-left w-3/4">
              <Stores stores={item.stores} />
              {/* <StoresNames storeNames={item.storeNames} /> */}
            </section>
            {/* <section className="flex justify-center items-center">
            <section>
              <ShortComment shortComment={item.shortComment} />
              <LongComment longComment={item.longComment} />
            </section>
            <TransPorts
              key={`rank-top-course-transports-${item.uuid}`}
              transports={item.transports}
            />
            <IsPrivate isPrivate={item.isPrivate} />
          </section> */}
          </section>
        </section>
      </div>
    </article>
  );
};

export default SearchTopcourse;

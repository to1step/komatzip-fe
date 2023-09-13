import { Course } from '@to1step/propose-backend';
import Name from '../../components/Post/Name';
import Tags from '../../components/Post/Tags';
import IsPrivate from '../Post/Course/IsPrivate';
import LongComment from '../Post/Course/LongComment';
import ShortComment from '../Post/Course/ShortComment';
import Stores from '../Post/Course/Stores';
import User from '../Post/Course/User';
import TransPorts from '../Post/Course/Transports';

const SearchTopcourse = ({ item }: { item: Course }) => {
  return (
    <main
      key={`search-top-course-${item.uuid}`}
      className="bg-white bg-opacity-50 m-3 shadow-lg"
    >
      <section className="m-2 flex-row justify-center items-center w-[380px]">
        <section className="m-2 flex-row justify-center items-center">
          <section>
            <Name
              key={`search-top-course-name-${item.uuid}`}
              name={item.name}
            />
            <User
              key={`search-top-course-user-${item.uuid}`}
              user={item.user}
            />
            <div className="m-1">
              <Tags
                key={`search-top-course-tag-${item.uuid}`}
                tags={item.tags}
              />
            </div>
          </section>
          <section className="my-2">
            <section className="mx-1 mt-3 mb-6 ">
              <Stores
                key={`search-top-course-stores-${item.uuid}`}
                stores={item.stores}
              />
            </section>
            <section className="mt-5 mb-5">
              <ShortComment
                key={`search-top-course-short-${item.uuid}`}
                shortComment={item.shortComment}
              />
            </section>
            <section className="mb-5">
              <TransPorts
                key={`search-top-course-transports-${item.uuid}`}
                transports={item.transports}
              />
            </section>
            {/* <IsPrivate
              key={`search-top-course-IsPrivate-${item.uuid}`}
              isPrivate={item.isPrivate}
            /> */}
          </section>
        </section>
      </section>
    </main>
  );
};

export default SearchTopcourse;

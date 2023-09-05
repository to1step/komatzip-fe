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
      className="cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg hover:rounded-xl"
    >
      <section className="m-1.5 flex-row justify-center items-center w-[296px]">
        <section className="flex-row justify-center items-center">
          <section className="my-1">
            <Name
              key={`search-top-course-name-${item.uuid}`}
              name={item.name}
            />
            <User
              key={`search-top-course-user-${item.uuid}`}
              user={item.user}
            />
            <Tags key={`search-top-course-tag-${item.uuid}`} tags={item.tags} />
          </section>
          <section className="my-1.5">
            <Stores
              key={`search-top-course-stores-${item.uuid}`}
              stores={item.stores}
            />
            <ShortComment
              key={`search-top-course-short-${item.uuid}`}
              shortComment={item.shortComment}
            />
            <LongComment
              key={`search-top-course-long-${item.uuid}`}
              longComment={item.longComment}
            />
            <TransPorts
              key={`search-top-course-transports-${item.uuid}`}
              transports={item.transports}
            />
            <IsPrivate
              key={`search-top-course-IsPrivate-${item.uuid}`}
              isPrivate={item.isPrivate}
            />
          </section>
        </section>
      </section>
    </main>
  );
};

export default SearchTopcourse;

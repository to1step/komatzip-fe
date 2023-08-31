
import Image from '../../components/Post/Store/Image';
import Name from '../../components/Post/Name';
import Tags from '../../components/Post/Tags';
import IsPrivate from '../Post/Course/IsPrivate';
import LongComment from '../Post/Course/LongComment';
import ShortComment from '../Post/Course/ShortComment';
import Stores from '../Post/Course/Stores';
// import TransPorts from '../Post/Course/Transports';
import User from '../Post/Course/User';

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
        <Tags tags={item.tags} />
        <p>코스에서만 나와야하는 데이터 목록</p>
        <IsPrivate isPrivate={item.isPrivate} />
        <LongComment longComment={item.LongComment} />
        <ShortComment shortComment={item.ShortComment} />
        <Stores stores={item.Stores} />
        {/* <TransPorts transports={item.TransPorts} /> */}
        <User user={item.User} />
      </section>
    </main>
  );
};

export default SearchTopcourse;

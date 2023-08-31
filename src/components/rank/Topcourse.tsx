import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Course } from '@to1step/propose-backend';
import axiosInstance from '../../api/apiInstance';

// import Tags from '../Post/Tags';
import Name from '../Post/Name';
import IsPrivate from '../Post/Course/IsPrivate';
import LongComment from '../Post/Course/LongComment';
import ShortComment from '../Post/Course/ShortComment';
import Stores from '../Post/Course/Stores';
import User from '../Post/Course/User';
import { RootState } from '../../redux/module';
// import TransPorts from '../Post/Course/Transports';
// import TransPorts from '../Post/Course/Transports';

const Topstore = () => {
  const address = useSelector((state: RootState) => state.location);
  const [data, setData] = React.useState<Course[]>([]);

  useEffect(() => {
    if (address) {
      axiosInstance
        .get<Course[]>(
          // `/v1/rank?type=store&region=${encodeURIComponent(address)}`,
          `/v1/rank?type=course&region=서울특별시%20강남구`,
        )
        .then((response) => {
          if (response && response.data.length > 0) setData(response.data); // 순위 정보
          console.log(response.data);
        })
        .catch((error) => {
          console.log('Topstore 데이터 fetching 중 에러 발생: ', error);
        });
    }
  }, [address]);

  return (
    <div className="flex-column justify-center items-center">
      {address ? <p>내 위치 : {address}</p> : <p>Loading...</p>}
      <h1 className="text-2xl font-semibold">이번 주 TOP 매장</h1>
      <article className="flex">
        {data.map((item) => (
          <div key={item.uuid}>
            {/* {item.representImage ? (
              <Image representImage={item.representImage} />
            ) : (
              <p className="w-[292px] h-[210px] flex justify-center items-center text-sm">
                이미지가 아직 준비되지 않았어요!
              </p>
            )} */}
            {/* <Tags tags={item.tags} /> */}
            <Name name={item.name} />
            <IsPrivate name={item.isPrivate} />
            <LongComment longComment={item.longComment} />
            <ShortComment shortComment={item.shortComment} />
            <Stores stores={item.stores} />
            {/* <TransPorts transports={item.transports} /> */}
            <User user={item.user} />
          </div>
        ))}
      </article>
      <section>
        <h1 className="text-2xl font-semibold">이번 주 TOP 코스</h1>
      </section>
    </div>
  );
};

export default Topstore;

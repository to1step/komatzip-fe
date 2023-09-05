import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Course, Store } from '@to1step/propose-backend';
import axiosInstance from '../api/apiInstance';
import { RootState } from '../redux/module';
import Location from '../components/Post/Store/Location';
import Name from '../components/Post/Name';
import Description from '../components/Post/Store/Description';
import Category from '../components/Post/Store/Category';
import Tags from '../components/Post/Tags';
import IsPrivate from '../components/Post/Course/IsPrivate';
import LongComment from '../components/Post/Course/LongComment';
import ShortComment from '../components/Post/Course/ShortComment';
import Stores from '../components/Post/Course/Stores';
import User from '../components/Post/Course/User';
import Image from '../components/Post/Store/Image';
import TransPorts from '../components/Post/Course/Transports';

const LandingPage = () => {
  const address = useSelector((state: RootState) => state.location);
  const [data, setData] = React.useState<Store[]>([]);
  const [courseData, setCourseData] = React.useState<Course[]>([]);
  const [isMoalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (address) {
      axiosInstance
        .get<Store[]>(
          `/v1/rank?type=store&region=${encodeURIComponent(address)}`,
          // `/v1/rank?type=store&region=서울특별시%20강남구`,
        )
        .then((response) => {
          if (response && response.data.length > 0) setData(response.data); // 순위 정보
        })
        .catch((error) => {
          console.log('Topstore 데이터 fetching 중 에러 발생: ', error);
        });
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      axiosInstance
        .get<Course[]>(
          `/v1/rank?type=course&region=${encodeURIComponent(address)}`,
          // `/v1/rank?type=course&region=서울특별시%20강남구`,
        )
        .then((response) => {
          if (response && response.data.length > 0)
            setCourseData(response.data); // 순위 정보
        })
        .catch((error) => {
          console.log('Topcourse 데이터 fetching 중 에러 발생: ', error);
        });
    }
  }, [address]);

  return (
    <main>
      <section>
        <p className="mt-3 mb-2 inline-block bg-gradient-to-t from-[#FFF743] via-transparent to-transparent">
          {address ? (
            <p>🦖 현재 내 위치 : {address}</p>
          ) : (
            <p>현재 내 위치 찾는중...</p>
          )}
        </p>
      </section>
      <section>
        <h1 className="align-middle mb-5 h-[30px] text-2xl font-semibold">
          🏆 이번 주 TOP 매장
        </h1>
        <article className="flex gap-4">
          {data.map((item) => (
            <div
              key={item.uuid}
              className="cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg hover:rounded-xl"
            >
              <article className="m-2">
                {item.representImage ? (
                  <Image representImage={item.representImage} />
                ) : (
                  <p className="w-[292px] h-[210px] flex justify-center items-center text-sm">
                    이미지가 아직 준비되지 않았어요!
                  </p>
                )}
                <section className="mt-2">
                  <Name name={item.name} />
                  <Location location={item.location} />
                  <Description description={item.description} />
                  <div className="flex mt-1">
                    <Category category={item.category} />
                    <Tags tags={item.tags} />
                  </div>
                </section>
              </article>
            </div>
          ))}
        </article>
      </section>
      <section>
        <h1 className="align-middle my-5 h-[30px] text-2xl font-semibold">
          🏆 이번 주 TOP 코스
        </h1>
        <article className="flex gap-4">
          <button onClick={openModal}>
            {courseData.map((item) => (
              <div
                key={item.uuid}
                className="cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg hover:rounded-xl "
              >
                <section className="m-2 flex justify-center items-center">
                  <section className="flex justify-center items-center">
                    <section className="flex-row">
                      <Name name={item.name} />
                      <User user={item.user} />
                    </section>
                    <section className="my-3">
                      {/* <Tags tags={item.tags} /> */}
                      <ShortComment shortComment={item.shortComment} />
                      <LongComment longComment={item.longComment} />
                      <TransPorts
                        key={`rank-top-course-transports-${item.uuid}`}
                        transports={item.transports}
                      />
                      <IsPrivate isPrivate={item.isPrivate} />
                      <Stores stores={item.stores} />
                    </section>
                  </section>
                </section>
              </div>
            ))}
          </button>
        </article>
      </section>
    </main>
  );
};

export default LandingPage;

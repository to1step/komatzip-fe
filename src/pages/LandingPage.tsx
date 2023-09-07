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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <main className="font-['SUITE-Regular']">
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
        <h1 className="align-middle mb-5 h-[30px] text-2xl font-semibold ">
          🏆 이번 주 TOP 매장
        </h1>
        <article className="flex gap-4">
          {data.map((item) => (
            <div
              key={item.uuid}
              className="cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg bg-white"
            >
              <article className="m-2 ">
                <div className="flex justify-center items-center">
                  {item.representImage ? (
                    <Image representImage={item.representImage} />
                  ) : (
                    <p className="w-[292px] h-[210px] flex justify-center items-center text-sm">
                      이미지가 아직 준비되지 않았어요!
                    </p>
                  )}
                </div>
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
        <article className="flex">
          <button onClick={openModal} className="flex gap-10">
            {courseData.map((item) => (
              <div
                key={item.uuid}
                className="flex justify-center w-[800px] h-[450px] cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg rounded-[30px] bg-[url('/images/topcourse-bg03.jpg')] bg-cover bg-center"
              >
                <div className="w-[800px] h-[450px] rounded-[30px]  flex justify-center items-center bg-blue-100 bg-opacity-30">
                  <section className="w-11/12 flex justify-center items-center">
                    <section className="flex-row justify-center items-center mr-[30px] text-amber-100  text-left">
                      <div className="mb-10">
                        <Name name={item.name} />
                      </div>
                      <div className="mb-3">
                        <User user={item.user} />
                      </div>
                      <Tags tags={item.tags} />
                    </section>
                    <section className="w-[450px] h-[400px] bg-white bg-opacity-60 rounded-[25px] flex flex-col justify-center items-center">
                      <section className="bg-white text-sm mb-10 mt-3 text-left w-3/4">
                        <Stores stores={item.stores} />
                      </section>
                      <section className="flex justify-center items-center">
                        <section>
                          <ShortComment shortComment={item.shortComment} />
                          <LongComment longComment={item.longComment} />
                        </section>
                        <TransPorts
                          key={`rank-top-course-transports-${item.uuid}`}
                          transports={item.transports}
                        />
                        {/* <IsPrivate isPrivate={item.isPrivate} /> */}
                      </section>
                    </section>
                  </section>
                </div>
              </div>
            ))}
          </button>
        </article>
      </section>
    </main>
  );
};

export default LandingPage;

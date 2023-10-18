import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Course, Store } from '@to1step/propose-backend';
import axiosInstance from '../api/apiInstance';
import { RootState } from '../redux/module';
import Name from '../components/Post/Name';
import Tags from '../components/Post/Tags';
import LongComment from '../components/Post/Course/LongComment';
import ShortComment from '../components/Post/Course/ShortComment';
import User from '../components/Post/Course/User';
import TransPorts from '../components/Post/Course/Transports';
import Header from '../components/Commons/Header';
import MultiCarousel from '../components/MultiCarousel/MultiCarousel';
import SearchTopstore from '../components/Search/SearchTopstore';
import Stores from '../components/Post/Course/Stores';

const LandingPage = () => {
  const address = useSelector((state: RootState) => state.location);
  const [data, setData] = React.useState<Store[]>([]);
  const [courseData, setCourseData] = React.useState<Course[]>([]);

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
      <div className=" bg-amber-700 h-[60vh] bg-cover bg-center">
        <div className="bg-blue-300 bg-opacity-20 h-[60vh]">
          <header>
            <Header
              showTitle={true}
              showBackButtonIcon={false}
              showSearch={true}
              showMainHeaderButton={true}
              showHamburgerButton={true}
            />
          </header>
          <section className="">
            <div className="text-center">
              <h1 className="mb-12 mt-20 h-[30px] text-4xl font-bold inline-block bg-gradient-to-t from-[#FFF743]">
                이번 주 TOP 매장
              </h1>
            </div>
            <article className="flex justify-center">
              <div className="w-10/12">
                <MultiCarousel type={'store'}>
                  {data.map((item) => (
                    <div key={item.uuid} className="w-1/5 flex justify-center">
                      <SearchTopstore item={item as Store} />
                    </div>
                  ))}
                </MultiCarousel>
              </div>
            </article>
          </section>
          <section>
            <div className="text-center">
              <h1 className="mt-40 mb-12 h-[30px] text-4xl font-bold inline-block bg-gradient-to-t from-[#FFF743]">
                이번 주 TOP 코스
              </h1>
            </div>
            <article className="flex justify-center">
              <div className="w-10/12">
                <MultiCarousel autoPlay={true} type={'course'}>
                  {courseData.map((item) => (
                    <div
                      key={item.uuid}
                      className="flex justify-center w-[800px] h-[450px] cursor-pointer transition-all duration-300 ease-in-out transform hover:shadow-lg rounded-[30px] bg-[url('/images/topcourse-bg03.jpg')] bg-cover bg-center"
                    >
                      <div className="w-[800px] h-[450px] rounded-[30px]  flex justify-center items-center bg-blue-100 bg-opacity-30">
                        <section className="w-11/12 flex justify-center items-center">
                          <section className="flex-row justify-center items-center mr-3 text-amber-100 text-left">
                            <div className="mb-10">
                              <Name name={item.name} />
                            </div>
                            <div className="mb-3">
                              <User user={item.user} />
                            </div>
                            <Tags tags={item.tags} />
                          </section>
                          <section className="w-[450px] h-[400px] bg-white bg-opacity-60 rounded-[25px] flex flex-col justify-center items-center">
                            <section className="mb-10 text-left w-3/4">
                              <Stores stores={item.stores} />
                              {/* <StoresNames storeNames={item.storeNames} /> */}
                            </section>
                            <section className="flex justify-center items-center">
                              <section>
                                <ShortComment
                                  shortComment={item.shortComment}
                                />
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
                </MultiCarousel>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;

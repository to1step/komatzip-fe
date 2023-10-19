import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Course, Store } from '@to1step/propose-backend';
import axiosInstance from '../api/apiInstance';
import { RootState } from '../redux/module';
import Header from '../components/Commons/Header';
import MultiCarousel from '../components/MultiCarousel/MultiCarousel';
import SearchTopstore from '../components/Search/SearchTopstore';
import SearchTopcourse from '../components/Search/SearchTopcourse';

const LandingPage = () => {
  const address = useSelector((state: RootState) => state.location);
  const [data, setData] = React.useState<Store[]>([]);
  const [courseData, setCourseData] = React.useState<Course[]>([]);
  const [courseUuid, setCourseUuid] = useState<string[]>([]);

  useEffect(() => {
    if (address) {
      axiosInstance
        .get<Store[]>(
          `/v1/rank?type=store&region=${encodeURIComponent(address)}`,
          // `/v1/rank?type=store&region=서울특별시%20강남구`,
        )
        .then((response) => {
          if (response && response.data.length > 0) {
            setData(response.data); // 순위 정보
            const uuidArray = response.data.map((item) => {
              console.log('uuid는여:', item.uuid);
              return item.uuid;
            });
            setCourseUuid(uuidArray);
          } else {
            console.log('서버에서 받은 데이터 없음');
          }
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
          if (response && response.data.length > 0) {
            setCourseData(response.data); // 순위 정보
            const uuidArray = response.data.map((item) => item.uuid);
            setCourseUuid(uuidArray);
          }
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
            <div className="text-center mb-12 mt-20">
              <h1 className="h-[30px] text-4xl font-bold inline-block bg-gradient-to-t from-[#FFF743] mb-5">
                이번 주 TOP 매장
              </h1>
              <h2>최고의 식사를 찾아 떠나는 주간 맛집 여행 ✈️</h2>
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
            <div className="text-center mt-40 mb-12">
              <h1 className="h-[30px] text-4xl font-bold inline-block bg-gradient-to-t from-[#FFF743] mb-5">
                이번 주 TOP 코스
              </h1>
              <h2>주간 최고 맛집 리스트를 만나보세요!</h2>
            </div>
            <article className="flex justify-center">
              <div className="w-10/12 mb-20">
                <MultiCarousel autoPlay={true} type={'course'}>
                  {courseData.map((item) => (
                    <div
                      key={item.uuid}
                      className="bg-[url('/images/topcourse-bg03.jpg')] bg-cover bg-center w-[600px]"
                    >
                      <SearchTopcourse item={item as Course} uuid={item.uuid} />
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

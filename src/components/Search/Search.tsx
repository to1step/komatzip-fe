import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputBox from '../Commons/InputBox';
// import SearchButton from '../Commons/SearchButton';
import axiosInstance from '../../api/apiInstance';
import {
  setSearchResultsCourse,
  setSearchResultsStore,
  setSearchQuery,
} from '../../redux/searchSlice';
// import { searchActions } from '../../redux/searchSlice';
import axios from 'axios';
import { RootState } from '../../redux/module';
import { Store } from '@to1step/propose-backend';
// 검색창 기능
const Search = () => {
  const address = useSelector((state: RootState) => state.location);
  const [data, setData] = React.useState<Store[]>([]);
  console.log(data);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagQuery, setTagQuery] = useState('');
  const [searchType, setSearchType] = useState('tags');
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await SearchStore(e);
    }
  };

  const SearchStore = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      let endpoint;
      let paramKey: string = ''; // 객체 속성 이름을 동적으로 설정할 때는 해당 속성 이름의 타입을 설정해줘야 함, 초기값 빈 문자열로 설정
      if (searchType === 'tags') {
        endpoint = 'tags';
        paramKey = 'tag';
      } else if (searchType === 'keyword') {
        endpoint = 'keyword';
        paramKey = 'keyword';
      }

      const [storeResponse, courseResponse] = await axios.all([
        axiosInstance.get(`/v1/search/${endpoint}`, {
          params: {
            type: 'store',
            [paramKey]: tagQuery,
            page: 1,
            pageSize: 10,
          },
        }),
        axiosInstance.get(`/v1/search/${endpoint}`, {
          params: {
            type: 'course',
            [paramKey]: tagQuery,
            page: 1,
            pageSize: 8,
          },
        }),
      ]);
      dispatch(setSearchResultsStore(storeResponse.data));
      console.log('매장 검색 결과 데이터:', storeResponse.data);
      dispatch(setSearchResultsCourse(courseResponse.data));
      console.log('코스 검색 결과 데이터:', courseResponse.data);
      dispatch(setSearchQuery(tagQuery));
      console.log('태그 쿼리:', tagQuery);
      navigate('/search'); // 검색 결과를 redux 상태에 저장한 후 페이지 라우팅
    } catch (error) {
      console.error('매장 검색 결과 fetching 중 에러 발생: ', error);
    }
  };
  return (
    <div className="flex-row justify-center items-center mb-10">
      <header>
        <form onSubmit={() => SearchStore}>
          <div className="flex justify-center items-center">
            <div>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="h-[40px] border-orange-600 border-2 border-r-0 text-sm placeholder-left px-5 rounded-l-full rounded-r-none focus:outline-none"
              >
                <option value="tags">태그 검색</option>
                <option value="keyword">매장 검색</option>
              </select>
            </div>
            <div className="relative">
              <InputBox
                value={tagQuery}
                onKeyPress={handleKeyPress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTagQuery(e.target.value)
                }
                name="tagQuery"
              />
            </div>
            <div className="p-[15px]">
              <button
                type="submit"
                className="h-[40px] w-[80px] text-sm bg-orange-200 border-none rounded-full text-orange-800 focus:outline-none "
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="text-center text-orange-200 mb-2 md:mb-0 mx-2 md:mx-5 text-xs md:text-lg">
            {address ? (
              <p>현재 내 위치는 "{address}"</p>
            ) : (
              <p>현재 내 위치 찾는중...</p>
            )}
          </div>
          <div>
            <nav className="text-center font-semibold mb-2 md:mb-0">
              <Link
                to="/map"
                className="text-xs md:text-lg text-orange-200 hover:underline"
              >
                내 주위 추천 장소 보러 가기
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Search;

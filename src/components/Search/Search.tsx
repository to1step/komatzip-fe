import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

// 검색창 기능

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagQuery, setTagQuery] = useState('');
  const [searchType, setSearchType] = useState('tags'); // 초기값을 'tags'

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await SearchStore();
    }
  };

  const SearchStore = async () => {
    try {
      let endpoint;

      if (searchType === 'tags') {
        endpoint = `tags`;
      } else if (searchType === 'keyword') {
        endpoint = `keyword`;
      }

      const [storeResponse, courseResponse] = await axios.all([
        axiosInstance.get(`/v1/search/${endpoint}`, {
          params: {
            type: 'store', // 현재 상태에 따라 'store'||'course'
            tag: tagQuery,
          },
        }),
        axiosInstance.get(`/v1/search/${endpoint}`, {
          params: {
            type: 'course',
            tag: tagQuery,
          },
        }), // https://api.to1step.shop/v1//v1/search/tags/tags?type=course&tag=%ED%8C%A8%EC%85%98 404 (Not Found)
      ]);

      dispatch(setSearchResultsStore(storeResponse.data));
      // console.log('매장 검색 결과 데이터:', storeResponse.data);

      dispatch(setSearchResultsCourse(courseResponse.data));
      // console.log('코스 검색 결과 데이터:', courseResponse.data);

      dispatch(setSearchQuery(tagQuery));
      console.log('검색한 태그:', tagQuery);
      console.log('선택한 엔드포인트:', endpoint);

      navigate('/search'); // 검색 결과를 redux 상태에 저장한 후 페이지 라우팅
    } catch (error) {
      console.error('매장 검색 결과 fetching 중 에러 발생: ', error);
    }
  };

  return (
    <div className="flex-row justify-center items-center">
      <div className="flex justify-center items-center">
        <div>
          {/* <label htmlFor="searchType">검색 타입: </label> */}
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="tags">태그 검색</option>
            <option value="keyword">키워드 검색</option>
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
          <Link
            to="/map-page"
            className="m-5 text-sm bg-transparent text-black hover:text-gray-500 hover:border-transparent focus:outline-none"
          >
            내 위치로 찾기
          </Link>
        </div>
        <div className="p-[15px]">
          <button
            onClick={SearchStore}
            className="h-[40px] w-[80px] text-sm bg-gray-100 border-none rounded-xl focus:outline-none hover:bg-gray-200"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;

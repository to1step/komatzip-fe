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
  const [searchType, setSearchType] = useState('tags');
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await SearchStore();
    }
  };
  const SearchStore = async () => {
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
        <form onSubmit={SearchStore}>
          <div className="flex justify-center items-center">
            <div>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="h-[40px] border-orange-600 border-2 border-r-0 text-sm placeholder-left px-5 border rounded-l-full rounded-r-none focus:outline-none"
              >
                <option value="tags">태그 검색</option>
                <option value="keyword">매장 검색</option>
                {/* TODO 영어일 때 대소문자 구분안되고 변환되게 */}
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
        <div>
          <nav className="text-center font-semibold">
            <Link to="/map" className="text-sl text-orange-200">
              지금 내 주위 장소 보기
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};
export default Search;

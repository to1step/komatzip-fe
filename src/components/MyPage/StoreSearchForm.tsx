import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import DefaultButton from '../Commons/DefaultButton';
import Paging from '../Pagination/Paging';

type Inputs = {
  store: string;
  exampleRequired: string;
};

type StoreData = {
  meta: { total_count: number; pageable_count: number; is_end: boolean };
  documents: {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
    // address: object; // 지번
    // road_address: object; // 도로명
  }[];
};

type IProps = {
  onSearch?: (value: StoreData['documents']) => void;
  onClose: () => void;
};

export default function StoreSearchForm({ onSearch, onClose }: IProps) {
  const [PaginationData, setPaginnation] = useState<StoreData['meta']>();
  const [storeList, setStoreList] = useState<StoreData['documents']>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const innerScrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(`data ${data.store}`);
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json`,
        {
          params: {
            format: 'json',
            query: data.store,
            category_group_code: 'FD6',
            page: currentPage,
            size: 15,
          },
          headers: {
            Authorization: `KakaoAK ${'b290d43245eb4212952883b4e7d1a798'}`,
          },
        },
      );

      setStoreList(response.data.documents);
      setPaginnation(response.data.meta);
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  useEffect(() => {
    onSubmit(watch());
  }, [currentPage]);

  const pageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    // 내부 스크롤 영역을 위로 올리기
    if (innerScrollRef.current) {
      innerScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="block min-w-[360px] min-h-[240px] w-auto bg-white">
      <div className="flex justify-end p-2">
        <button onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
      {/* 검색 폼 */}
      <article className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mb-4 gap-2"
        >
          <label htmlFor="store" className="leading-7 text-gray-600 text-lg">
            매장 검색
          </label>
          <input
            placeholder="검색할 업체명을 입력하세요."
            className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            {...register('store', { required: true })}
          />
          <div>{errors.store && <span>This field is required</span>}</div>
          <DefaultButton type="submit">조회</DefaultButton>
        </form>
      </article>
      {/* 조회 데이터 */}
      <article className="p-4 max-h-[500px] overflow-auto" ref={innerScrollRef}>
        {storeList?.map((item, index) => {
          return (
            <div className="border-t-[2px] py-2 grid gap-1" key={index}>
              <div className="font-bold text-lg">{item.place_name}</div>
              <div>{item.category_name}</div>
              <div className="text-gray-500">{item.road_address_name}</div>
              <DefaultButton>선택</DefaultButton>
            </div>
          );
        })}
        {/* pagination */}
        {/* pagination 추가 해야함 */}
        {PaginationData && (
          <Paging
            page={currentPage} // 현재 페이지
            count={PaginationData.pageable_count} // 총 아이템 갯수
            setPage={pageChange} // 페이지 변경을 핸들링하는 함수
          />
        )}
      </article>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import StoreInfo from '../modal/StoreInfo';

interface StoreData {
  uuid: string;
  name: string;
  category: number;
  description: string;
  location: string;
  coordinates: number[];
  representImage: string;
  tags: string[];
  startTime: string;
  endTime: string;
}

const Topstore = () => {
  const [topStore, setTopStore] = useState<StoreData | null>(null);
  // const [isModelOpen, setIsModalOpen] = useState(false);
  const { region } = useParams<{ region: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get<StoreData[]>(
        //   `https://api.to1step.shop/v1/rank?type=store&region=${region}`,
        // );
        const response = await axios.get<StoreData[]>(
          `https://api.to1step.shop/v1/rank?type=store&region=서울시%20송파구`,
        );
        const data: StoreData[] = response.data;
        console.log(data);
        setTopStore(response.data[0]); // 순위 1등 매장 정보 저장
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('API 호출 중 에러 발생:', error);
        }
      }
    };

    fetchData();
  }, [region]);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="p-4">
      {topStore ? (
        <div>
          <h1 className="text-3xl font-bold mb-2">이번주 Top 매장</h1>
          <div>
            {/* <button onClick={handleOpenModal}> */}
            <h2 className="text-lg font-bold">{topStore.name}</h2>
            <p className="text-sm">{topStore.description}</p>
            <p className="text-sm">{topStore.location}</p>

            <p>UUID: {topStore.uuid}</p>
            <p>Category: {topStore.category}</p>
            <p>Coordinates: {topStore.coordinates.join(', ')}</p>
            <img
              src={topStore.representImage}
              alt={topStore.name}
              className="w-48 h-auto mt-4"
            />
            <p>문여는 시간: {topStore.startTime}</p>
            <p>문닫는 시간: {topStore.endTime}</p>

            <div>
              <h3 className="text-lg font-bold">Tags</h3>
              <ul>
                {topStore.tags.map((tag) => (
                  <li key={tag} className="text-sm">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            {/* <button onClick={handleCloseModal}>닫기</button> */}
            {/* </button> */}
          </div>
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Topstore;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { openModal, closeModal } from '../../redux/modalSlice';
export interface StoreInfoProps {
  uuid: string;
  name: string;
  category: number;
  description: string;
  location: string;
  coordinates: [number, number];
  representImage: string;
  tags: string[];
  startTime: string;
  endTime: string;
  storeReviews: StoreReviewProps[];
  reviewCount: number;
  likeCount: number;
  iLike: boolean;
}

interface StoreReviewProps {
  uuid: string;
  user: string;
  review: string;
}

const StoreInfo = () => {
  //   const dispatch = useDispatch();
  //   const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

  return <div>특정 가게 정보를 가져와 모달로 구현한 컴포넌트입니다.</div>;
};

export default StoreInfo;

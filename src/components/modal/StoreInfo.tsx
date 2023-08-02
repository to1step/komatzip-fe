import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StoreInfoProps {
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
  storeReviews: StoreReview[];
  reviewCount: number;
  likeCount: number;
  iLike: boolean;
}

interface StoreReview {
  uuid: string;
  user: string;
  review: string;
}

const StoreInfo = ({ StoreInfoProps: store }) => {
  return <div>특정 가게 정보를 가져와 모달로 구현한 컴포넌트입니다.</div>;
};

export default StoreInfo;

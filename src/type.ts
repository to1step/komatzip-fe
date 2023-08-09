export interface Komatzip {
  email: string;
  password: string;
  nickname: string;
  code: string; // 이메일 인증 코드
  grant_type: string;
  refresh_token: string;
  provider: string;
  profileImage: string;
  commentAlarm: boolean; // 유저 관련 api
  updateAlarm: boolean; // 유저 관련 api
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
  storeReviews: StoreReviews[];
  reviewCount: number;
  likeCount: number;
  iLike: boolean;
  review: string;
  stores: string[];
  shortComment: string;
  longComment: string;
  isPrivate: boolean;
  transport: Transport[];
  courseReview: CourseReview[];
}

interface StoreReviews {
  uuid: string;
  user: string;
  review: string;
}

interface Transport {
  startStore: string;
  endStore: string;
  comment: string;
  transportation: number;
}

interface CourseReview {
  uuid: string;
  user: string;
  review: string;
}

interface Rank {
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

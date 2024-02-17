import { StoreEntireInfo } from '@to1step/propose-backend';

interface CourseListProps {
  recommendedCourses: StoreEntireInfo[];
  markerInfo: StoreEntireInfo;
}

const CourseList = ({ recommendedCourses, markerInfo }: CourseListProps) => {
  return (
    <ul className="mt-2 text-lg overflow-y-auto max-h-[420px]">
      {recommendedCourses.map(
        (
          course,
          index, // recommendedCourses를 매핑하여 목록을 생성
        ) => (
          <li
            key={index}
            className="flex items-center mt-2 border border-gray-300 rounded p-2 shadow-md"
          >
            <img
              src={course.representImage || '기본 이미지'}
              alt="추천 코스 이미지"
              className="w-28 h-20 mr-4 roaunded"
            />
            <div>
              <p className="text-lg font-semibold">{course?.name}</p>
              <p>{`${markerInfo.tags}`}</p>
              <p>
                {course?.startTime} ~ {course?.endTime}
              </p>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export default CourseList;

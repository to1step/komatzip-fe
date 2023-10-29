function CourseSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-2 mx-auto bg-white shadow-lg select-none sm:w-full sm:p-4 sm:h-96 rounded-2xl">
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-col flex-1 gap-3">
          <div className="w-1/3 h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="w-1/2 h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="flex gap-3">
            <div className="w-12 h-3 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-12 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="w-full bg-gray-200 animate-pulse h-60 rounded-2xl"></div>
        </div>
      </div>
      <div className="w-full h-3" />
    </div>
  );
}

export default CourseSkeleton;

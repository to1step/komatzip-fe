const StoreSkeleton = () => {
  return (
    <div className="mx-auto bg-white shadow-lg w-96 rounded-2xl">
      <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
      <div className="p-3 h-">
        <div className="grid grid-cols-5 gap-4 mt-2">
          <div className="h-6 col-span-3 bg-gray-200 rounded animate-pulse" />
          <div className="col-span-2 ..." />
          <div className="h-4 col-span-2 bg-gray-200 rounded animate-pulse" />
          <div className="col-span-3 ..." />
          <div className="h-3 col-span-3 bg-gray-200 rounded animate-pulse" />
          <div className="col-span-2 ..." />
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded  animate-pulse" />
          <div className="col-span-5 ..." />
        </div>
      </div>
    </div>
  );
};

export default StoreSkeleton;

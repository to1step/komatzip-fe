interface StoresNamesProps {
  storesNames: string;
}

const StoreNames = ({ storesNames }: StoresNamesProps) => {
  return (
    <div className="text-xs mt-1">
      <p>{storesNames}</p>
    </div>
  );
};

export default StoreNames;

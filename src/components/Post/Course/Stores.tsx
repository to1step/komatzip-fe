interface StoresProps {
  stores: string[];
}

const Stores = ({ stores }: StoresProps) => {
  return <div>매장명 : {stores.join(', ')}</div>;
};

export default Stores;

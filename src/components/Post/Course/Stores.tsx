
interface StoresProps {
  stores: string[];
}

const Stores = ({ stores }: StoresProps) => {
  return <div>{stores.join(', ')}</div>;
};

export default Stores;

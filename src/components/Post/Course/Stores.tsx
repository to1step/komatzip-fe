

interface StoresProps {
  stores: string;
}

const Stores = ({ stores }: StoresProps) => {
  return <div>{stores}</div>;
};

export default Stores;

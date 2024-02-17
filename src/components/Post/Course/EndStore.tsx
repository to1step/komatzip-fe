interface EndStoreProps {
  endStore: string;
}

const EndStore = ({ endStore }: EndStoreProps) => {
  return (
    <div>
      <article>
        <p className=" text-2xl font-bold">{endStore}</p>
      </article>
    </div>
  );
};

export default EndStore;

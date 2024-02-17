interface StartStoreProps {
  startStore: string;
}

const StartStore = ({ startStore }: StartStoreProps) => {
  return (
    <div>
      <article>
        <p className="text-2xl font-bold">{startStore}</p>
      </article>
    </div>
  );
};

export default StartStore;

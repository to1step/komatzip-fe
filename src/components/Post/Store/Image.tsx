interface ImageProps {
  representImage: string;
}

const Image = ({ representImage }: ImageProps) => {
  return (
    <div className="w-[292px] h-[210px]  rounded-lg overflow-hidden">
      <article style={{ width: '100%', height: '100%' }}>
        <img src={representImage} alt="Image" />
      </article>
    </div>
  );
};

export default Image;

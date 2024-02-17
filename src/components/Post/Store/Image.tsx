interface ImageProps {
  representImage: string;
}

const Image = ({ representImage }: ImageProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <img
        src={representImage}
        alt="Image"
        className="w-[280px] h-[150px] md:h-[200px] "
      />
    </div>
  );
};

export default Image;

interface ImageProps {
  representImage: string;
}

const Image = ({ representImage }: ImageProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <img
        src={representImage}
        alt="Image"
        className="w-full h-1/5 max-h-[250px]"
      />
    </div>
  );
};

export default Image;

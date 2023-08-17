interface GalleryProps {
  mainImg: string;
  images: string[];
  viewAll?: () => void;
}

const Gallery = ({ mainImg, images, viewAll }: GalleryProps) => {
  return (
    <section className="text-gray-400 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={
                  mainImg ?? 'https://via.placeholder.com/400x400?text=No+Image'
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            {images.map((image, index) => {
              return index <= 3 && index != 3 ? (
                <div className="md:p-2 p-1 w-1/2">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src={
                      image[index] ??
                      'https://via.placeholder.com/200x200?text=No+Image'
                    }
                  />
                </div>
              ) : (
                <div className="md:p-2 p-1 w-1/2">
                  <div className="relative">
                    <img
                      alt="gallery"
                      className="w-full object-cover h-full object-center block bg-black bg-opacity-30"
                      src={
                        image[index] ??
                        'https://via.placeholder.com/200x200?text=No+Image'
                      }
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold cursor-pointer"
                      onClick={viewAll && viewAll}
                    >
                      {`모두 보기 (${image.length}장)`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

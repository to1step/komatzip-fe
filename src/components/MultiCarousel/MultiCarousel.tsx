import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

type Props = {
  children: React.ReactNode;
  autoPlay?: boolean;
};
export default function MultiCarousel({ children, autoPlay }: Props) {
  return (
    <Carousel
      infinite
      autoPlay={autoPlay}
      responsive={responsive}
      itemClass="m-2"
    >
      {children}
    </Carousel>
  );
}

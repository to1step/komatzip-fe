import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsiveStore = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const responsiveCourse = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1424 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1424, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
  type: 'store' | 'course';
  autoPlay?: boolean;
};
export default function MultiCarousel({ children, autoPlay, type }: Props) {
  return (
    <Carousel
      infinite
      autoPlay={autoPlay}
      responsive={type === 'course' ? responsiveCourse : responsiveStore}
      itemClass="m-4"
    >
      {children}
    </Carousel>
  );
}

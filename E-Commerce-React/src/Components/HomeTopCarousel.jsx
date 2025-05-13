import AliceCarousel from 'react-alice-carousel';
import { HomeCrousel } from '../Carousel/HomeCrousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function HomeTopCarousel() {
  // Duplicate the items array to ensure we have enough items to loop
  const items = [...HomeCrousel, ...HomeCrousel].map((item, index) => (
    <div key={index}>
      <img
        className="cursor-pointer"
        role="presentation"
        src={item.image}
        alt="carousel item"
      />
    </div>
  ));

  return (
    <AliceCarousel
      autoHeight
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={2000}
      infinite
      touchTracking
    />
  );
}

export default HomeTopCarousel;

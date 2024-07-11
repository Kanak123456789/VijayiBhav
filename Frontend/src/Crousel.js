import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Crousel() {
  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/crousel/carousel-items')
      .then((response) => {
        setCarouselItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching carousel items:', error);
      });
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carouselItems.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={item.imageUrl}
            alt={`${item.label} slide`}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Crousel;

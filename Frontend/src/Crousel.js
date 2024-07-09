import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Crousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?cs=srgb&dl=pexels-pixabay-301920.jpg&fm=jpg"
          alt="First slide"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/639359406/photo/students-studying-in-college-library.jpg?s=612x612&w=0&k=20&c=8ItJkQbEDQPMRkjqxCCpCKIBThJ6dZ2HLWfwQ4Zj470="
          alt="Second slide"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://t4.ftcdn.net/jpg/04/30/26/81/360_F_430268143_vgIE6L3H5JRxpqeAP1QBm2s2fOYmRNDC.jpg"
          alt="Third slide"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Crousel;

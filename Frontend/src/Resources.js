import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Image from 'react-bootstrap/Image';

function Resources() {
  const lang = {
    paddingTop: "30px",
    paddingBottom: "30px",
  };
  const l1 = {
    fontSize: "80px",
  };

  return (
    <>
      <div style={lang}>
        <h1 style={l1}>Resources</h1>
        <h4>
          "The good life is one inspired by love and guided by knowledge."{" "}
        </h4>
      </div>
    </>
  );
}

export default Resources;

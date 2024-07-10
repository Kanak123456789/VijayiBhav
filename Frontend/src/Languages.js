import Accordion from "react-bootstrap/Accordion";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Image from "react-bootstrap/Image";

function Languages() {
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
        <h1 style={l1}>Languages</h1>
        <h4>"The limits of my language are the limits of my world."</h4>
      </div>
      <Accordion className="mala">
        <Accordion.Item eventKey="0">
          <Accordion.Header> Sanskrit</Accordion.Header>
          <Accordion.Body className="sansk">
            <Image style={{height:"250px", width:"1300px"}}
              className="sans"
              src="https://www.djjs.org/uploads/blog/61ea72ec6748d5d23c46ea16d263b5a7.jpg"
            />

            <p className="sans1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Provident quis temporibus ea saepe ab quas deserunt aut ipsum
              nihil, corrupti corporis ducimus fuga, accusamus, pariatur
              reiciendis qui sed consectetur autem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Deserunt ipsam repellendus delectus
              officiis sapiente! Dolores consequatur facere deleniti
              consequuntur rem nulla? Adipisci dolores iste fugit quibusdam nam
              inventore veniam sunt!
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>English</Accordion.Header>
          <Accordion.Body className="sansk">
            <p className="sans1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Provident quis temporibus ea saepe ab quas deserunt aut ipsum
              nihil, corrupti corporis ducimus fuga, accusamus, pariatur
              reiciendis qui sed consectetur autem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Deserunt ipsam repellendus delectus
              officiis sapiente! Dolores consequatur facere deleniti
              consequuntur rem nulla? Adipisci dolores iste fugit quibusdam nam
              inventore veniam sunt!
            </p>
            <Image style={{height:"250px", width:"1300px"}}
              className="sans"
              src="https://t3.ftcdn.net/jpg/03/70/42/66/360_F_370426690_Pejt9KxjWTHPklsKwripaxr0iA17zupF.jpg "
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Hindi</Accordion.Header>
          <Accordion.Body className="sansk">
          <Image style={{height:"250px", width:"1300px"}}
              className="sans"
              src="https://img.etimg.com/thumb/width-1200,height-1200,imgsize-1176885,resizemode-75,msid-78093842/news/politics-and-nation/view-the-role-of-hindi-as-a-unifier.jpg"
            />
            <p className="sans1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Provident quis temporibus ea saepe ab quas deserunt aut ipsum
              nihil, corrupti corporis ducimus fuga, accusamus, pariatur
              reiciendis qui sed consectetur autem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Deserunt ipsam repellendus delectus
              officiis sapiente! Dolores consequatur facere deleniti
              consequuntur rem nulla? Adipisci dolores iste fugit quibusdam nam
              inventore veniam sunt!
            </p>
             
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Languages;

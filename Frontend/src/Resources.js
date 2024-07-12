import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import "./resourses.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/resourses/resourses-items')
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the resources!', error);
      });
  }, []);

  const lang = {
    paddingTop: "30px",
    paddingBottom: "30px",
  };
  const l1 = {
    fontSize: "60px",
  };

  return (
    <>
      <div style={lang}>
        <h1 style={l1}>Resources</h1>
        <h4>
          "The good life is one inspired by love and guided by knowledge."{" "}
        </h4>
      </div>
      <div className="container">
        <div className="row">
          {resources.map((resource, index) => {
            const cleanLink = resource.link ? resource.link.replace(/^http:\/\/localhost:5000/, '') : '';

            return (
              <div className="col-md-4 mb-4" key={index}>
                <div className="resource-card">
                  <img src={resource.image} alt={resource.title} className="resource-image" />
                  <a href={cleanLink} className="resource-link">
                    <div className="resource-hover">
                      <h5>{resource.title}</h5>
                      <p>{resource.description}</p>
                      <button className="btn btn-primary">Open PDF</button>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Resources;

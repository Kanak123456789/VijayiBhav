import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import "./styles.css";
import "./resourses.css";
import { UserContext } from "./UserContext";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { baseURL } from './Url'; // Ensure baseURL is correctly defined
import AOS from 'aos';
import 'aos/dist/aos.css';

function Resources() {
  useEffect(() => {
    AOS.init();
  }, []);
  
  const [resources, setResources] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState(null);

  // Fetch resources items
  const fetchResourcesItems = () => {
    axios.get(`${baseURL}/resourses/resourses-items`)
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the resources!', error);
      });
  };

  // Fetch current user details
  const fetchCurrentUser = useCallback(() => {
    axios
      .get(`${baseURL}/current_user`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [setUser]);

  // Load user from localStorage or fetch from server
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      fetchCurrentUser();
    }
  }, [setUser, fetchCurrentUser]);

  // Fetch resources on component mount
  useEffect(() => {
    fetchResourcesItems();
  }, []);

  // Delete resource item
  const deleteResourceItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .post(`${baseURL}/resourses/delete-resourses-item`, { itemId })
        .then((response) => {
          console.log("Resource item deleted:", response.data);
          setAlertMessage({
            type: "success",
            text: "Resource item deleted successfully",
          });
          fetchResourcesItems();  // Refresh the list after deletion
        })
        .catch((error) => {
          console.error("Error deleting resource item:", error);
          setAlertMessage({
            type: "danger",
            text: "Failed to delete resource item",
          });
        });
    }
  };

  return (
    <>
      {alertMessage && (
        <div className={`alert alert-${alertMessage.type}`} role="alert">
          {alertMessage.text}
        </div>
      )}
      <div className="resbanner">
        <h1>Resources</h1>
        <h4>"The good life is one inspired by love and guided by knowledge."</h4>
      </div>
      <div className="container c1">
        <div className="row">
          {resources.map((resource) => {
            // Use the resource ID as the key for better performance
            return (
              <div className="col-md-4 mb-4" key={resource._id}>
                <div className="resource-card" data-aos="flip-right">
                  {/* Handle Base64 image */}
                  <img
                    src={`data:image/jpeg;base64,${resource.image}`} // Adjust the MIME type as necessary
                    alt={resource.title}
                    className="resource-image"
                  />
                  <a href={resource.link} className="resource-link">
                    <div className="resource-hover">
                      <h5>{resource.title}</h5>
                      <p>{resource.description}</p>
                      <button className="btn btn-primary">Open PDF</button>
                    </div>
                  </a>
                </div> 
                <br />
                {user && (user.role === "admin" || user.role === "owner") && (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteResourceItem(resource._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Resources;

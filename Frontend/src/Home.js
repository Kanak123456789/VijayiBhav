import { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Crousel from "./Crousel";
import "./styles.css";
import loadingGif from "./loading.gif"; // Import your GIF file
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay to demonstrate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Adjust the delay as needed (in milliseconds)

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home-container">
            <Header />
            {loading ? (
                <div className="loading-container">
                    <img src={loadingGif} alt="Loading..." />
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="content">
                    <Crousel />
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Home;

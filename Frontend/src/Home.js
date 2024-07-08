import Header from "./Header";
import Footer from "./Footer";
import Crousel from "./Crousel";
import "./styles.css";
function Home() {
    return ( 
        <div className="home-container">
            <Header />
            <div className="content">
                <Crousel />
            </div>
            <Footer />
        </div>
    );
}

export default Home;

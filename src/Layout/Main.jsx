import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";


const Main = () => {
    return (
        <div>
            <Navbar/>
            <div className="pt-24 min-h-[calc(100vh-150px)]">
                <Outlet/>
            </div>
            <Footer/>
            
        </div>
    );
};

export default Main;
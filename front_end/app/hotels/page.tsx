import Footer from "@/components/Footer";
import Header from "@/components/Header1";
import Hotel from "@/components/HotelPage";


const HotelPage = () => {
    return ( 
        <div className="main overflow-x-scroll">
            <Header/>
            <Hotel/>
            <Footer/>
        </div>
     );
}
 
export default HotelPage;
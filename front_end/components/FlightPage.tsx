import "react-datepicker/dist/react-datepicker.css";
import TravelServices from "./TravelEssentials&Services";
import BookFlight from "./BookFlight";
import PopularFlightPage from "./PopularFlights";
import Airlines from "./Airlines";
import Questions from "./questionSection";
import FlightBooking from "./FlightBooking";
import NavPage from "./Navigation";

const Topbar = () => {
    
    return (
        <div className="wrapper mainContainer">
            <NavPage/>
            <TravelServices/>
            <BookFlight/>
            <PopularFlightPage/>
            <Airlines/>
            <Questions/>
            <FlightBooking/>
        </div>
        
    );
};

export default Topbar;

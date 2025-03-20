import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Topbar from "@/components/FlightPage";
import FlightRoutes from "@/components/Footer1";


export default function Home() {
  return (
    <div className="main overflow-x-scroll">
      <Header />
      <Topbar />
      <FlightRoutes />
      <Footer />
    </div>
  );
}

import { useSelector } from "react-redux";
import Read from "../CRUD/Read";
import header from "../../assets/header-img.png";
import Create from "../CRUD/CreateUpdateDelete";
import Message from "../UI/Message";

const Home = () => {
  return (
    <>
      <Read />
      <div className="navbar bg-black h-20">
        <img src={header} className="h-16" />
      </div>
      <div className="navbar bg-indigo-800">
        <h1 className="mx-auto text-white text-xl font-bold">
          <marquee direction="left" className="text-white w-screen max-w-5xl">
            {"5% Discount on all espresso bar drinks!!! buy now!".toUpperCase()}
          </marquee>
        </h1>
      </div>
      <Message/>
      <Create />
      
    </>
  );
};
export default Home;

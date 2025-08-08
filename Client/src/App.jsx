import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <main className="bg-gray-100">
        <Navbar></Navbar>
      <div className='min-h-[calc(100vh-335px)]'>
        <Outlet />
      </div>
      <Footer></Footer>
      </main>
    </>
  );
}

export default App;

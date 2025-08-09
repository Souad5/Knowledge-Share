import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <main >
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

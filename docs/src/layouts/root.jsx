import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { AUTHOR, SITE } from "../lib/consts";

export default function Root() {
  return (
    <div className="container">
      <Navbar site={SITE} />
      <main>
        <Outlet />
      </main>
      <Footer author={AUTHOR} />
    </div>
  );
}

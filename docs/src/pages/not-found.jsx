import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function NotFound() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <article className="card">
          <h1>404</h1>
          <h3>Page Not Found</h3>
          <Link to={"/"}>
            <button>Go home</button>
          </Link>
        </article>
      </main>
      <Footer />
    </div>
  );
}

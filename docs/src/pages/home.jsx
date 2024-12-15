import axios from "axios";
import { useEffect, useState } from "react";
import config from "../lib/config";
import { MaterialSymbolsSearchRounded } from "../assets/icons/search-icon";
import Card from "../components/card";
import { formatData } from "../lib/utils";

export default function Home() {
  const values = {
    query: "",
  };
  const [formData, setFormData] = useState(values);
  const [movies, setMovies] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.tmdb.org/3/search/movie?query=${formData.query}&include_adult=false&language=en-US&page=1`,
        config,
      );

      const choices = await formatData(res);

      setMovies(choices);

      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const res = await axios.get(
          `https://api.tmdb.org/3/trending/movie/day?&include_adult=false&language=en-US&page=1`,
          config,
        );

        const choices = await formatData(res);

        setMovies(choices);
      } catch (error) {
        console.error(error);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <section>
      <article>
        <p className="font-semibold">Hey there,</p>
        <p>This is bingehub. Search and stream movies.</p>
      </article>
      <form onSubmit={handleSubmit} method="post" className="flex-row">
        <input
          type="text"
          name="query"
          placeholder="Search for a movie..."
          value={formData.query}
          onChange={handleChange}
          required
        />
        <button type="submit" className="icon">
          <MaterialSymbolsSearchRounded />
        </button>
      </form>
      <section>
        {movies.length > 0
          ? movies.map((movie) => <Card key={movie?.value} movie={movie} />)
          : null}
      </section>
    </section>
  );
}

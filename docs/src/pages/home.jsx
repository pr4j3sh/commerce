import axios from "axios";
import { useState } from "react";
import config from "../lib/config";
import { MaterialSymbolsSearchRounded } from "../assets/icons/search-icon";

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

      const choices = res.data.results
        .map((result) => ({
          name: result?.title || result?.original_title,
          release: result?.release_date || "",
          poster: result?.backdrop_path || result?.poster_path,
          rating: result?.vote_average || 0,
          value: result?.id,
        }))
        .filter((choice) => choice.release !== "");

      setMovies(choices);

      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
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
          ? movies.map((movie) => (
              <section className="card" key={movie?.value}>
                <a
                  href={`https://vidsrc.icu/embed/movie/${movie?.value}`}
                  target="_blank"
                >
                  <img
                    className="card-media"
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster}`}
                  />
                </a>
                <article className="card-body">
                  <article className="flex items-start justify-between">
                    <a
                      href={`https://vidsrc.icu/embed/movie/${movie?.value}`}
                      target="_blank"
                    >
                      <p className="font-bold">{movie?.name}</p>
                    </a>
                    <article className="flex items-center gap-2">
                      {movie?.rating !== 0 && (
                        <p className="tag">{movie?.rating?.toFixed(1)}</p>
                      )}
                      <p>{movie?.release?.split("-")[0]}</p>
                    </article>
                  </article>
                </article>
              </section>
            ))
          : null}
      </section>
    </section>
  );
}

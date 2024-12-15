export default function Card({ movie }) {
  return (
    <section className="card">
      <a
        href={`https://vidsrc.icu/embed/movie/${movie?.value}`}
        target="_blank"
      >
        <img
          className="card-media"
          src={`https://image.tmdb.org/t/p/original/${movie?.poster}`}
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
  );
}

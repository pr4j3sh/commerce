export default function Footer({ author }) {
  return (
    <footer>
      <p>
        &copy;{" "}
        <a href={author?.URL} target="_blank">
          {author?.USERNAME}
        </a>
      </p>
      <article className="btns">
        <a href={author?.TWITTER} target="_blank">
          twitter
        </a>
        <span>/</span>
        <a href={author.GITHUB} target="_blank">
          github
        </a>
      </article>
    </footer>
  );
}

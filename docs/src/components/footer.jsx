export default function Footer({ author }) {
  return (
    <footer>
      <p>
        <a href={author?.URL} target="_blank">
          {author?.USERNAME}
        </a>
      </p>
      <article className="btns">
        <a href={author?.CHAT} target="_blank">
          chat
        </a>
        <span>/</span>
        <a href={author.GITHUB} target="_blank">
          github
        </a>
      </article>
    </footer>
  );
}

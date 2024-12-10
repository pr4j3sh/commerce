import ModeToggle from "./mode-toggle";

export default function Navbar({ site }) {
  return (
    <nav>
      <a href="/" className="font-semibold">
        {site?.REPO}
      </a>
      <ul className="btns">
        <a href="https://www.npmjs.com/package/bingehub" target="_blank">
          <button className="secondary small">Download</button>
        </a>
        <ModeToggle />
      </ul>
    </nav>
  );
}

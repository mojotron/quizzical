import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <h3 className="Footer__info">
        created by{" "}
        <a
          className="Footer__info__link"
          href="https://github.com/mojotron/quizzical"
          target="_blank"
          rel="noopener noreferrer"
        >
          @mojotron
        </a>
      </h3>
    </footer>
  );
};

export default Footer;

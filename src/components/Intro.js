import "../styles/Intro.css";

const Intro = (props) => {
  return (
    <div className="Intro">
      <h1 className="Intro__heading">Quizzical</h1>
      <p className="Intro__info">have fun answering trivia questions</p>
      <button type="button" className="btn" onClick={props.handleQuizRunning}>
        Start quiz
      </button>
    </div>
  );
};

export default Intro;

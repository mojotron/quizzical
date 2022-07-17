import "../styles/Question.css";
import uniqid from "uniqid";

const Question = (props) => {
  const determineClassName = (answer) => {
    let className;
    // question answered correct
    if (props.data.selected === props.data.correct) {
      if (answer === props.data.selected) className = "Answer green";
      else className = "Answer opacity";
      // question answered incorrect
    } else {
      if (props.data.selected === answer) className = "Answer red opacity";
      else if (props.data.correct === answer)
        className = "Answer green opacity";
      else className = "Answer opacity";
    }
    return className;
  };

  const answerElements = props.data.answers.map((answer) => {
    // create button element depending on game state
    if (props.displayAnswer) {
      return (
        <button key={uniqid()} className={determineClassName(answer)}>
          {answer}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => props.handleAnswerClick(props.data.id, answer)}
          key={uniqid()}
          className={
            props.data.selected === answer ? "Answer active" : "Answer"
          }
        >
          {answer}
        </button>
      );
    }
  });

  return (
    <div data-testid="question" className="Question">
      <h3 className="Question__heading">{props.data.question}</h3>
      <div className="Question__answers">{answerElements}</div>
    </div>
  );
};

export default Question;

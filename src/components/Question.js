import "../styles/Question.css";
import uniqid from "uniqid";

const Question = (props) => {
  const answerElements = props.data.answers.map((answer) => {
    if (props.displayAnswer) {
      let className;
      if (props.data.selected === props.data.correct) {
        // question answered good
        if (answer === props.data.selected) className = "Answer green";
        else className = "Answer opacity";
      } else {
        // question answered bad
        if (props.data.selected === answer) className = "Answer green opacity";
        else if (props.data.correct === answer)
          className = "Answer red opacity";
        else className = "Answer opacity";
      }

      return (
        <button key={uniqid()} className={className}>
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
    <div title="question" className="Question">
      <h3 className="Question__heading">{props.data.question}</h3>
      <div className="Question__answers">{answerElements}</div>
    </div>
  );
};

export default Question;

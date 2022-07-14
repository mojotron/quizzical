import "../styles/Question.css";
import uniqid from "uniqid";

const Question = (props) => {
  const answerElements = props.data.answers.map((answer) => (
    <button
      onClick={() => props.handleAnswerClick(props.data.id, answer)}
      key={uniqid()}
      className={props.data.selected === answer ? "Answer active" : "Answer"}
    >
      {answer}
    </button>
  ));

  return (
    <div title="question" className="Question">
      <h3 className="Question__heading">{props.data.question}</h3>
      <div className="Question__answers">{answerElements}</div>
    </div>
  );
};

export default Question;

import { useEffect, useState } from "react";
import "../styles/Questions.css";
import uniqid from "uniqid";
import shuffle from "../utils/shuffle";
import htmlEntitiesDecode from "../utils/htmlEntitiesDecode";
import Question from "./Question";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";

const Questions = (props) => {
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [loadQuestion, setLoadQuestions] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!loadQuestion) return;
    fetchQuestions();
    setDisplayAnswer(false);
    setLoadQuestions(false);
  }, [loadQuestion]);

  const handleAnswerClick = (id, answer) => {
    setQuestionData((oldData) => {
      const temp = oldData.map((ele) => {
        if (ele.id === id) {
          return { ...ele, selected: answer };
        } else {
          return ele;
        }
      });
      return temp;
    });
  };

  const handleCheckAnswersClick = () => {
    const allSelected = questionData.every((ele) => ele.selected !== "");
    if (allSelected) {
      setError("");
      setDisplayAnswer((oldValue) => !oldValue);
    } else {
      setError("Please answer on all questions!");
    }
  };

  const fetchQuestions = async () => {
    try {
      const category =
        props.data.category === "any" ? "" : `&category=${props.data.category}`;
      const difficulty =
        props.data.difficulty === "any"
          ? ""
          : `&difficulty=${props.data.difficulty}`;

      const response = await fetch(
        `https://opentdb.com/api.php?amount=${props.data.numberOfQuestions}&type=multiple` +
          category +
          difficulty
      );
      const data = await response.json();

      const temp = data.results.map((question) => {
        return {
          id: uniqid(),
          question: htmlEntitiesDecode(question.question),
          correctAnswer: htmlEntitiesDecode(question.correct_answer),
          answers: shuffle(
            ...question.incorrect_answers,
            question.correct_answer
          ).map((ele) => htmlEntitiesDecode(ele)),
          selected: "",
        };
      });
      setQuestionData(temp);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("NetworkError, please try again!");
      setLoading(false);
    }
  };

  const questionElements = questionData.map((question) => {
    return (
      <Question
        key={question.id}
        data={{
          id: question.id,
          question: question.question,
          answers: question.answers,
          selected: question.selected,
          correct: question.correctAnswer,
        }}
        displayAnswer={displayAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    );
  });

  const countCorrectAnswers = () => {
    return questionData.filter((ele) => ele.correctAnswer === ele.selected)
      .length;
  };

  if (loading) return <LoadingSpinner />;
  // if (error.startsWith("NetworkError")) return <Error message={error} />;

  return (
    <div className="Questions">
      <button className="btn btn--close" onClick={props.handleQuizRunning}>
        x
      </button>

      <div className="Questions__container">{questionElements}</div>

      {error && <Error message={error} />}

      <div className="Questions__controls">
        {displayAnswer && (
          <p className="Questions__controls__result">
            You scored {countCorrectAnswers()}/{questionData.length} correct
            answers
          </p>
        )}
        {displayAnswer && (
          <button
            type="button"
            className="btn small"
            onClick={() => {
              setLoading(true);
              setLoadQuestions(true);
            }}
          >
            Play again
          </button>
        )}

        {!displayAnswer && !error.startsWith("NetworkError") && (
          <button
            type="button"
            className="btn"
            onClick={handleCheckAnswersClick}
          >
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;

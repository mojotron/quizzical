import { useEffect, useState } from "react";
import "../styles/Questions.css";
import Question from "./Question";
import uniqid from "uniqid";

const Questions = () => {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      const temp = data.results.map((question) => {
        return {
          question: question.question.replace(
            /(&#(\d+);)/g,
            (match, capture, charCode) => String.fromCharCode(charCode)
          ),
          correctAnswer: question.correct_answer,
          answers: [...question.incorrect_answers, question.correct_answer],
        };
      });
      setQuestionData(temp);
    } catch (error) {
      console.log(error);
    }
  };
  // &quot; &rsquo; &eacute;

  const questionElements = questionData.map((question) => {
    return (
      <Question
        key={uniqid()}
        data={{ question: question.question, answers: question.answers }}
      />
    );
  });

  return <div className="Questions">{questionElements}</div>;
};

export default Questions;

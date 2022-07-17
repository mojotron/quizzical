import { useEffect, useState } from "react";
import Intro from "./components/Intro";
import LoadingSpinner from "./components/LoadingSpinner";
import Questions from "./components/Questions";
import Error from "./components/Error";
import "./styles/App.css";

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [quizData, setQuizData] = useState({
    numberOfQuestions: "5",
    category: "any",
    difficulty: "any",
  });
  const [quizRunning, setQuizRunning] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
        setError(
          "Network error, please refresh the page or try later. Sorry :("
        );
      });
  }, []);

  const handleQuizRunning = () => setQuizRunning((oldValue) => !oldValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuizData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  if (!dataLoaded) return <LoadingSpinner />;
  if (error !== "") return <Error message={error} />;

  return (
    <div className="App">
      {quizRunning ? (
        <Questions
          data={{
            numberOfQuestions: quizData.numberOfQuestions,
            difficulty: quizData.difficulty,
            category: quizData.category,
          }}
          handleQuizRunning={handleQuizRunning}
        />
      ) : (
        <Intro
          categories={categories}
          numberOfQuestions={quizData.numberOfQuestions}
          difficulty={quizData.difficulty}
          category={quizData.category}
          handleQuizRunning={handleQuizRunning}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default App;

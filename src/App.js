import { useState } from "react";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import "./styles/App.css";

// api url => "https://opentdb.com/api.php?amount=5&type=multiple"

const App = () => {
  const [quizRunning, setQuizRunning] = useState(false);

  const handleQuizRunning = () => setQuizRunning((oldValue) => !oldValue);

  return (
    <div className="App">
      {quizRunning ? (
        <Questions />
      ) : (
        <Intro handleQuizRunning={handleQuizRunning} />
      )}
    </div>
  );
};

export default App;

import "../styles/Intro.css";

const Intro = (props) => {
  const optionElements = props.categories.map((ele) => (
    <option key={ele.id} value={ele.id}>
      {ele.name}
    </option>
  ));

  return (
    <div className="Intro">
      <h1 className="Intro__heading">Quizzical</h1>
      <p className="Intro__info">have fun answering trivia questions</p>

      <form aria-label="form">
        <fieldset data-testid="fieldset">
          <legend>Number of question</legend>
          <input
            id="5-questions"
            type="radio"
            name="numberOfQuestions"
            value="5"
            checked={props.numberOfQuestions === "5"}
            onChange={props.handleChange}
          />
          <label htmlFor="5-questions">5</label>
          <input
            id="10-questions"
            type="radio"
            name="numberOfQuestions"
            value="10"
            checked={props.numberOfQuestions === "10"}
            onChange={props.handleChange}
          />
          <label htmlFor="10-questions">10</label>
          <input
            id="15-questions"
            type="radio"
            name="numberOfQuestions"
            value="15"
            checked={props.numberOfQuestions === "15"}
            onChange={props.handleChange}
          />
          <label htmlFor="15-questions">15</label>
        </fieldset>
        <fieldset data-testid="fieldset">
          <legend>Question difficulty</legend>
          <input
            id="any-difficulty"
            type="radio"
            name="difficulty"
            value="any"
            checked={props.difficulty === "any"}
            onChange={props.handleChange}
          />
          <label htmlFor="any-difficulty">any</label>
          <input
            id="any-difficulty"
            type="radio"
            name="difficulty"
            value="easy"
            checked={props.difficulty === "easy"}
            onChange={props.handleChange}
          />
          <label htmlFor="any-difficulty">easy</label>
          <input
            id="any-difficulty"
            type="radio"
            name="difficulty"
            value="medium"
            checked={props.difficulty === "medium"}
            onChange={props.handleChange}
          />
          <label htmlFor="any-difficulty">medium</label>
          <input
            id="any-difficulty"
            type="radio"
            name="difficulty"
            value="hard"
            checked={props.difficulty === "hard"}
            onChange={props.handleChange}
          />
          <label htmlFor="any-difficulty">hard</label>
        </fieldset>
        <fieldset data-testid="fieldset">
          <legend htmlFor="category">Categories</legend>
          <select
            id="category"
            value={props.category}
            name="category"
            onChange={props.handleChange}
          >
            <option value="Any">Any</option>
            {optionElements}
          </select>
        </fieldset>
      </form>

      <button type="button" className="btn" onClick={props.handleQuizRunning}>
        Start quiz
      </button>
    </div>
  );
};

export default Intro;

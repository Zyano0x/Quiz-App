import { useQuiz } from "../context/QuizContext.tsx";
import { useAppDispatch } from "../Store.tsx";
import { start } from "../features/QuizSlice.ts";

function StartScreen() {
  const { numQuestions } = useQuiz();
  const dispatch = useAppDispatch();

  return (
    <div className={"start"}>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button className={"btn btn-ui"} onClick={() => dispatch(start())}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;

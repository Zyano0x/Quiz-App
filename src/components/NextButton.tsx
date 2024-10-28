import { useQuiz } from "../context/QuizContext.tsx";
import { useAppDispatch } from "../Store.tsx";
import { finish, next } from "../features/QuizSlice.ts";

function NextButton() {
  const { answer, index, numQuestions } = useQuiz();
  const dispatch = useAppDispatch();

  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <button className={"btn btn-ui"} onClick={() => dispatch(next())}>
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button className={"btn btn-ui"} onClick={() => dispatch(finish())}>
        Finish
      </button>
    );
}

export default NextButton;

import { useQuiz } from "../context/QuizContext.tsx";
import { useAppDispatch } from "../Store.tsx";
import { answer as answerAction } from "../features/QuizSlice.ts";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

function Options({ question }: { question: Question }) {
  const { answer } = useQuiz();
  const dispatch = useAppDispatch();
  const hasAnswered = answer !== null;

  return (
    <div className={"options"}>
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          onClick={() => {
            dispatch(answerAction(index));
          }}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

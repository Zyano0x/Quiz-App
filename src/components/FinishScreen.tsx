import { useQuiz } from "../context/QuizContext.tsx";
import { useAppDispatch } from "../Store.tsx";
import { restart } from "../features/QuizSlice.ts";

function FinishScreen() {
  const { points, maxPoints, highScore } = useQuiz();
  const dispatch = useAppDispatch();
  const percent = (points / maxPoints) * 100;

  let emoji;
  if (percent === 100) {
    emoji = "🥇";
  }
  if (percent > 80 && percent < 100) {
    emoji = "🥳";
  }
  if (percent > 50 && percent < 80) {
    emoji = "🫢";
  }
  if (percent > 0 && percent < 50) {
    emoji = "😩";
  }
  if (percent === 0) {
    emoji = "🤫";
  }

  return (
    <>
      <p className={"result"}>
        <span>{emoji}</span>You scored {points} out of {maxPoints} points (
        {Math.ceil(percent)}%)
      </p>
      <p className={"highScore"}>(High Score: {highScore} points)</p>
      <button className={"btn btn-ui"} onClick={() => dispatch(restart())}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;

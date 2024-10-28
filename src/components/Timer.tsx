import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext.tsx";
import { useAppDispatch } from "../Store.tsx";
import { time } from "../features/QuizSlice.ts";

function Timer() {
  const { timeRemaining } = useQuiz();
  const dispatch = useAppDispatch();
  const minutes = Math.floor(timeRemaining! / 60);
  const seconds = timeRemaining! % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(time());
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className={"timer"}>
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;

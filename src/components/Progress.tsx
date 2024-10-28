import { useQuiz } from "../context/QuizContext.tsx";

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;

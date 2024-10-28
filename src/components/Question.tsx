import { useQuiz } from "../context/QuizContext.tsx";
import Options from "./Options.tsx";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;

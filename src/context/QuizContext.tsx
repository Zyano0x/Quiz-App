import { createContext, ReactNode, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store.tsx";
import axios, { AxiosResponse } from "axios";
import { failed, received } from "../features/QuizSlice.ts";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface QuizContextType {
  questions: Question[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  timeRemaining: number | null;
  numQuestions: number;
  maxPoints: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

function QuizProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { questions, status, index, answer, points, highScore, timeRemaining } =
    useAppSelector((state) => state.quiz);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(() => {
    axios
      .get("http://localhost:1337/questions")
      .then((response: AxiosResponse) => dispatch(received(response.data)))
      .catch(() => dispatch(failed()));
  }, [dispatch]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        timeRemaining,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("useQuiz was used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };

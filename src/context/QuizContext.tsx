import { createContext, ReactNode, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store.tsx";
import supabase from "../services/supabase.ts";
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

  const numQuestions: number = questions.length;
  const maxPoints: number = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("questions").select("*");
      if (error) {
        dispatch(failed());
        return;
      }
      dispatch(received(data));
    };
    fetchData();
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

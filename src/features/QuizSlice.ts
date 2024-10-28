import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SECS_PER_QUESTION = 30;

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface QuizState {
  questions: Question[];
  status: "loading" | "ready" | "active" | "failed" | "finished";
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  timeRemaining: number | null;
}

const initialState: QuizState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
};

const QuizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    received(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.status = "ready";
    },
    failed(state) {
      state.status = "failed";
    },
    start(state) {
      state.status = "active";
      state.timeRemaining = Number(state.questions.length * SECS_PER_QUESTION);
    },
    answer(state, action: PayloadAction<number>) {
      const question = state.questions[state.index];
      state.answer = action.payload;

      if (action.payload === question.correctOption) {
        state.points += question.points;
      }
    },
    next(state) {
      state.index += 1;
      state.answer = null;
    },
    finish(state) {
      state.status = "finished";

      if (state.points > state.highScore) {
        state.highScore = state.points;
      }
    },
    restart(state) {
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };
    },
    time(state) {
      if (state.timeRemaining !== null) {
        state.timeRemaining -= 1;
        if (state.timeRemaining === 0) {
          state.status = "finished";
        }
      }
    },
  },
});

export const { received, failed, start, answer, next, finish, restart, time } =
  QuizSlice.actions;
export default QuizSlice.reducer;

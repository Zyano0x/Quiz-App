import Header from "./components/Header.tsx";
import { useQuiz } from "./context/QuizContext.tsx";
import Main from "./components/Main.tsx";
import Loader from "./components/Loader.tsx";
import StartScreen from "./components/StartScreen.tsx";
import Progress from "./components/Progress.tsx";
import Question from "./components/Question.tsx";
import Footer from "./components/Footer.tsx";
import NextButton from "./components/NextButton.tsx";
import FinishScreen from "./components/FinishScreen.tsx";
import Timer from "./components/Timer.tsx";
import Error from "./components/Error.tsx";

function App() {
  const { status } = useQuiz();

  return (
    <div className={"app"}>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.tsx";
import store from "./Store.tsx";
import { QuizProvider } from "./context/QuizContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QuizProvider>
        <App />
      </QuizProvider>
    </Provider>
  </StrictMode>,
);

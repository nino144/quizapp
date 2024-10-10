import React from "react";
import { Route, Routes } from "react-router-dom";
import ChooseScreen from "./components/ChooseScreen";
import ResultScreen from "./components/ResultScreen";
import SelectedQuestionScreen from "./components/SelectedQuestionScreen";
import ManagedTuplesScreen from "./components/ManagedTuplesScreen";
import ManagedScreen from "./components/ManagedScreen";
import QuizScreen from "./components/QuizScreen";
import AddQuestionScreen from "./components/AddQuestionScreen";
import UserResults from "./components/UserResults";
import ManagedResultsScreen from "./components/ManagedResultsScreen";
import EditResultScreen from "./components/EditResultScreen";
import StartScreen from "./components/StartScreen";
import EnterNameScreen from "./components/EnterNameScreen";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
            <Route path="/choose-screen" element={<ChooseScreen />} />
            <Route path="/" element={<StartScreen />} />
            <Route path="/selected-question" element={<SelectedQuestionScreen />} />
            <Route path="/quiz" element={<QuizScreen />} />
            <Route path="/add-question" element={<AddQuestionScreen />} />
            <Route path="/result" element={<ResultScreen />} />
            <Route path="/managed-tuples" element={<ManagedTuplesScreen />} />
            <Route path="/managed" element={<ManagedScreen />} />
            <Route path="/managed-results" element={<ManagedResultsScreen />} />
            <Route path="/user-results" element={<UserResults />} />
            <Route path="/edit-results" element={<EditResultScreen />} />
            <Route path="/enter-name" element={<EnterNameScreen />} />
         </Routes>
    </div>
  );
};

export default App;
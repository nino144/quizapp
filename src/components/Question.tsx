import React, { useEffect, useState } from "react";
import { Questions } from "../types/Questions";
import { Choices } from "../types/Choices";
import { Answers } from "../types/Answers";

interface QuestionProps {
  question: Questions;
  chooseAnswer: (
    selectedValue: Choices,
    questionId: string,
    rightAnswer: boolean
  ) => void;
  answer: Answers;
}

const Question: React.FC<QuestionProps> = ({
  question,
  chooseAnswer,
  answer
}) => {
  const [click, setClick] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<string>("3");
  const optionChoosed: string = answer?.optionChoosed ?? "0";

  useEffect(() => {
    let timer: any;

    if (parseInt(seconds) > 0 && click === false && parseInt(optionChoosed) === 0) {
        timer = setTimeout(() => {
            setSeconds(String(parseInt(seconds) - 1));
        }, 1000);
    } 
    else if(parseInt(seconds) <= 0 && click === false) {
        setSeconds('TIME UP!');
        chooseAnswer("0" as Choices, question.id, false);
        setClick(true);
    }
    return () => clearTimeout(timer);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [seconds]); 

  return (
    <div className="question-container">
      <div className="time">
        <h2>Time Left: {seconds}</h2>
      </div>

      <div className="box specifig">{question.question} </div>

      {[
        question.option1,
        question.option2,
        question.option3,
        question.option4
      ].map((option, index) => (
        <button key={String(index + 1)}

           className={"box " + 
           (String(index + 1) === optionChoosed && optionChoosed !== (question.rightAnswer) ? "false" 
           : (String(index + 1) === optionChoosed && optionChoosed === (question.rightAnswer) ? "true" 
           : click === true && String(index + 1) === question.rightAnswer ? "true" : ""))
           }

           onClick={() => {
            setClick(true);
            chooseAnswer(
              String(index + 1) as Choices,
              question.id,
              String(index + 1) === question.rightAnswer
            );
          }}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
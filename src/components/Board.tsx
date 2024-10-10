import React, { useState } from "react";
import { Questions } from "../types/Questions";
import { Choices } from "../types/Choices";
import { Answers } from "../types/Answers";

import Question from "./Question";
import { ArrowLeftOutlined, ArrowRightOutlined  } from '@ant-design/icons';
import { Button } from 'antd';

interface BoardProps {
  questions: Questions[];
  saveAnswer: (answer: Answers) => void;
  answers: Answers[];
}

const Board: React.FC<BoardProps> = ({questions, saveAnswer, answers}) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const defaultAnswer: Answers = {
    id: '', 
    questionId: '',
    isRightAnswer: false,
  };

  const handleAnswer = (selectedValue: Choices, questionId: string, rightAnswer: boolean) => {
    let answer: Answers = {
      id: questionId,
      questionId: questionId,
      optionChoosed: selectedValue,
      isRightAnswer: rightAnswer
    };

    saveAnswer(answer);
  };

  if(!questions || questions.length === 0) {
    return <div>No questions available yet</div>;
  }

  return (
    <div className="question-list">
        {questions
          .filter((question) => question.id === questions[questionIndex].id)
          .map((question) => (
            <Question
              key={question.id}
              question={question}
              chooseAnswer={handleAnswer}
              answer={answers.find((answer) => answer.questionId === question.id) || defaultAnswer}
            />
          ))
          }
        <div className="btn-container">
          {questionIndex >=  1 && <Button
                    onClick={() => setQuestionIndex(questionIndex - 1)}> 
                      <ArrowLeftOutlined/>
          </Button>}

          {questionIndex < questions.length - 1  && <Button 
                    onClick={() => setQuestionIndex(questionIndex + 1)}> 
                    <ArrowRightOutlined/>
          </Button>}
        </div>
      </div>
 
  );
};

export default Board;
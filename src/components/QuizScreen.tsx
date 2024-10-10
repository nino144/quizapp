import React, { useEffect, useState,useRef } from "react";

import { Answers } from "../types/Answers";
import { Tuples } from "../types/Tuples";

import Board from "./Board";
import { useNavigate } from "react-router-dom";
import { Questions } from "../types/Questions";
import { Button } from 'antd';

const QuizScreen: React.FC = () => {
    const tuple: string = JSON.parse(localStorage.getItem('tuple') || '0');
    const name: string = JSON.parse(localStorage.getItem('name') || '[]');
    const items: Tuples[] = JSON.parse(localStorage.getItem('questionData') || '[]');
    const navigate = useNavigate(); 
    const questions: Questions[] = items[parseInt(tuple)].questions;
    const [answers, setAnswers] = useState<Answers[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const timeRef = useRef<string>("0"); 

    useEffect(() => {
        const intervalId = setInterval(countTime, 1000);
        return () => clearInterval(intervalId); 
    }, []);

  if(tuple === null || name === null) {
    return (
      <div className="answer-container center">
        <div>
          <div className="center">
            <p className="title no-margin">Please enter user name and <br /> choose tuple to start!</p>
          </div>

          <button 
          className="start-btn" 
          onClick ={() => navigate("/enter-name")}>
          Start Quiz Again
        </button>
        </div>
      </div>
    )
  }

  const saveAnswer = (answer: Answers) => {
    const oldAnswerIndex = answers.findIndex((a) => a.id === answer.id);

    if (oldAnswerIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[oldAnswerIndex] = answer;
      setAnswers(newAnswers);
    } else {
      setAnswers((prevAnswers) => [...prevAnswers, answer]);
    }
  };
  
  const handleNavigate = () => {
    localStorage.setItem('time', JSON.stringify(timeRef.current));
    navigate("/result", { state: { answersProp: answers } })  
  }

  const countTime = () => {
    timeRef.current +=1;
    
    if (buttonRef.current) {
      buttonRef.current.textContent = timeRef.current;
    }
  }

  return (
    <div className="app">
      <h3 className="quiz-title">User: {name} </h3>
      <Button 
        className="result-btn" 
        onClick={handleNavigate}>
          Result
      </Button>

      <Button 
        className="result-btn timer" 
        ref={buttonRef}>
          Time
      </Button>

      <Board
        questions={questions}
        saveAnswer={saveAnswer}
        answers={answers}
      />

    </div>
  );
};

export default QuizScreen;
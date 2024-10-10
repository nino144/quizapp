import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionData from "../data/QuestionData";
import { Button } from 'antd';

const StartScreen: React.FC = () => {
  const navigate = useNavigate(); 
  useEffect(()=> {
    localStorage.clear();
    localStorage.setItem('questionData', JSON.stringify(questionData));
  });

  return (
    <div className="start-screen">
      <h2>Simple Quiz Appliction</h2>
      <img className="start-image" src="https://viralsolutions.net/wp-content/uploads/2019/06/shutterstock_749036344.jpg" alt="img" />

      <div className="btn-container">
        <Button 
            className="start-btn" 
            htmlType="button" 
            onClick ={() => navigate("/choose-screen")}>
         Star Quiz
        </Button>

      </div>
    </div>
  );
};

export default StartScreen;
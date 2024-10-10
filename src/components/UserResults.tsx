import React from "react";
import { useNavigate } from "react-router-dom";
import { convertTime } from '../util/TimeUtil';
import { Button } from 'antd';

const UserResults: React.FC = () => {
  const resultsObj = JSON.parse(localStorage.getItem('userResults') || '[]');
  const navigate = useNavigate(); 
  const name = JSON.parse(localStorage.getItem('name') || '');

  const getUserResults = () => {
    const userResults = resultsObj.filter((result: any) => result.name === name);
    return userResults;
  }

  const getUserTotalQuestions = () => {
    let questionsCount = 0;
    userResults.forEach((result: any) => {
      questionsCount += result.answers.length;
    })

    return questionsCount;
  }

  const userResults = getUserResults();

  const getUserTotalRightAnwers = () => {
    let rightAnwersCount = 0;

    userResults.forEach((result: any) => {
      result.answers.forEach((obj: any) => {
        if(obj.rightAnswer === obj.optionChoosed) {
            rightAnwersCount++;
        }
      })
    })

    return rightAnwersCount;
  }

  const getUsersTotalDoingQuizTime = () => {
    let timeCount = 0;

    userResults.forEach((result: any) => {
      timeCount += result.time;
    });

    return timeCount;
  }

  const questionsCount = getUserTotalQuestions();
  const rightAnwersCount = getUserTotalRightAnwers();
  const totalTime = getUsersTotalDoingQuizTime();

  return (
    <div className="answer-container">
      <div className="result-title">Quiz Result of {name}</div>
      <div>
        {userResults.map((result: any) =>  {
          return (
            <div key={result.id}>
              <div>
                <p>Date: {result.date}</p>
                <p>Time: {convertTime(result.time)}</p>
              </div>
              
              {result.answers.map((obj: any) => {
                return (
                  <ul className="result-box" key={obj.answerId}>
                    <li className="question">
                      {obj.question}                 
                    </li>
                    <div className="option-container">
                    {
                      ["1", "2", "3", "4"].map((option: string) => (
                        <li key={option}
                          className={
                            obj.rightAnswer ===  option
                              ? "true" 
                              : obj.rightAnswer !==  option && obj.optionChoosed === option 
                              ? "false"
                              : ""}>
                            <span className="space">{option}.</span> {obj["option" + option]}
                        </li>
                      )
                    )}  
                    </div>
                  </ul>
                )
              })}

            </div>
          );
        })
      }
        <div>
          <p className="text-content">Statistics</p>
          <p> Total Questions: {questionsCount} </p> 
          <p> Right Anwers: {rightAnwersCount} </p>
          <p> TotalTime: {convertTime(totalTime)} </p>
        </div>

        <div className="btn-container">
          <Button 
            className="start-btn" 
            onClick ={() => navigate("/selected-question")}>
            Start Again
          </Button>

          <Button 
            className="start-btn" 
            onClick ={() => navigate("/enter-name")}>
            Change User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserResults;
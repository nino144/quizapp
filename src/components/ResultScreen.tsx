import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { convertTime } from '../util/TimeUtil';
import { nanoid } from 'nanoid';
import { Button } from 'antd';
import { Tuples } from "../types/Tuples";
import { Questions } from "../types/Questions";

const ResultScreen: React.FC = () => {
  const location = useLocation()
  const answers = location.state?.answersProp || null;
  const name: string = JSON.parse(localStorage.getItem('name') || '');
  const items: Tuples[] = JSON.parse(localStorage.getItem('questionData') || '[]');
  const time: string = JSON.parse(localStorage.getItem('time') || '0');
  const navigate = useNavigate(); 

  if(answers === null || answers.length === 0 ){
    return (
      <div className="answer-container center">
        <div>
          <div className="center">
            <p className="title no-margin">No Answers Yet!</p>
          </div>

          <Button 
            className="start-btn" 
            onClick ={() => navigate("/enter-name")}>
            Start Quiz
          </Button>
        </div>
      </div>
    )
  }

    const answersIdList = answers.map((answer: any) => answer.questionId);
    const getQuestionsList = () => {
        let tempArr: Questions[] = [];
        items.forEach((item: Tuples) => {
        item.questions.forEach((i: Questions)=> {
            if (answersIdList.includes(i.id)) {
                tempArr.push(i);
            }
        })
        })

        return tempArr;
    }

    const questions = getQuestionsList();

    const generateResults = () => {
        const userResultsObj: any = {
            id: nanoid(),
            name: name,
            date: new Date().toLocaleString(),
            time: time,
            answers: []
        }

        for(let i =  0; i < questions.length; i++) {
            userResultsObj.answers.push(
                {
                answerId: nanoid(),
                question: questions[i].question,
                option1: questions[i].option1,
                option2: questions[i].option2,
                option3: questions[i].option3,
                option4: questions[i].option4,
                rightAnswer: questions[i].rightAnswer,
                optionChoosed: answers[i].optionChoosed
                }
            );
        }

    return userResultsObj;
    }

  const resultsObj = generateResults();

  const checkExist = (allResults: any, obj: any) => {
    return allResults.find((result: any) => {
      return result.date === obj.date && result.name === obj.name;
    }) != null;
  }

  const saveResults = () => {
    const allResults = JSON.parse(localStorage.getItem('userResults') || '[]');
    if (!checkExist(allResults, resultsObj)) {
        allResults.push(resultsObj);
    }

    localStorage.setItem('userResults', JSON.stringify(allResults));
  };

  saveResults();

  let height = 30;

  const exportToPDF = () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pdfFileTitle = "quiz_result_user_" + resultsObj.name;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const totalRightAnswers = answers.filter((answer: any) => answer.isRightAnswer === true).length;
    const marginLeft = 60;

    pdf.setFont("helvetica");
    pdf.setFontSize(25);
    pdf.text("Quiz result user " + resultsObj.name, pageWidth / 2, height , { align: "center" });
    pdf.setFontSize(12);
    pdf.text("Export time: " + resultsObj.date, pageWidth - marginLeft / 2, increaseHeight() , { align: "right" });
    pdf.setFontSize(16);
    pdf.line(marginLeft, increaseHeight(), pageWidth - marginLeft, height);

    resultsObj.answers.forEach((obj: any, index: number) => {
      pdf.setFontSize(16);
      pdf.text("Question " + (++index) , pageWidth / 2, increaseHeight() , { align: "center" });
      pdf.text(obj.question , pageWidth / 2, increaseHeight() , { align: "center" });
      pdf.setFontSize(14);
      pdf.text("1.      " + obj.option1 , marginLeft , increaseHeight(), { align: "center" });
      pdf.text("2.      " + obj.option2 , marginLeft + (pageWidth - 2 * marginLeft) * (1/3) , height, { align: "center" });
      pdf.text("3.      " + obj.option3 , marginLeft + (pageWidth - 2 * marginLeft) * (2/3), height, { align: "center" });
      pdf.text("4.      " + obj.option4 , pageWidth - marginLeft, height, { align: "center" });
      pdf.text("Correct option: " + obj.rightAnswer , marginLeft / 2,  increaseHeight(), { align: "left" });
      pdf.text("User Choosed: " + obj.optionChoosed , marginLeft / 2, increaseHeight(), { align: "left" });
      pdf.line(marginLeft, increaseHeight(), pageWidth - marginLeft, height);

      if (index % 4 === 0) {
        pdf.addPage();
        height = 0;
      }
    })

    pdf.setFontSize(16);
    pdf.text("Statistics", pageWidth/2, increaseHeight(), { align: "center" });
    pdf.setFontSize(14);
    pdf.text("Total Questions: " + resultsObj.answers.length, marginLeft / 2, increaseHeight(), { align: "left" });
    pdf.text("Total Right Answers: " + totalRightAnswers, marginLeft / 2, increaseHeight(), { align: "left" });
    pdf.text("Time Doing: " + convertTime(parseInt(resultsObj.time)), marginLeft / 2, increaseHeight(), { align: "left" });

    pdf.save(pdfFileTitle + ".pdf");
  };

  const increaseHeight = () => {
    height = height + 30;
    return height;
  }

  return (
    <div className="answer-container">
      <div id="pdf" >
        <div className="result-title">Quiz Result of {resultsObj.name}</div>
        {resultsObj.answers.map((obj: any, index: number) => {
            return (
              <ul className="result-box" key={index}>
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

        <div>
          <p className="text-content">Statistics</p>
          <p> Total Questions: {questions.length} </p>
          <p> Right Answers: {answers.filter((answer: any) => answer.isRightAnswer === true).length || 0} </p>
          <p> Time Doing: {convertTime(parseInt(time))} </p>
        </div>
      </div>

      <div className="btn-container">
        <Button 
          className="start-btn" 
          onClick ={() => navigate("/selected-question")}>
          Start Again
        </Button>

        <Button 
          className="start-btn" 
          onClick={exportToPDF}>
            Export PDF
        </Button>

        <Button 
          className="start-btn" 
          onClick ={() => navigate("/enter-name")}>
          Change User
        </Button>

        <Button 
          className="start-btn" 
          onClick ={() => navigate("/user-results")}>
          Previous Results
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;
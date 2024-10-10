import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAbbreviatedDate } from '../util/DateUtil';
import { convertTime } from '../util/TimeUtil';
import { nanoid } from 'nanoid';
import { ArrowLeftOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Popconfirm, notification } from 'antd';
import { Questions } from "../types/Questions";
import { Tuples } from "../types/Tuples";

const EditResultScreen: React.FC = () => {
  const navigate = useNavigate(); 
  const id = JSON.parse(localStorage.getItem('resultId') || '');
  const allResults = JSON.parse(localStorage.getItem('userResults') || '');
  const questionData = JSON.parse(localStorage.getItem('questionData') || '');
  const [results, setResults] = useState<any>(allResults);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [userChoice, setUserChoice] = useState<string>("");
  const [answerEditable, setAnswerEditable] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    api["info"]({
      message: message,
      description: description,
    });
  };

  const findUserResult = () => {
    return results.find((result: any) => result.id === id);
  };

  const userResult = findUserResult();

  const changeSelectOptionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuestionId(event.target.value);
  }; 

  const changeSelectChoiceHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserChoice(event.target.value);
  };

  let selectedQuestion: Questions;

    if(selectedQuestionId !== "") {
        questionData.forEach((tuple: Tuples) => {
        tuple.questions.forEach((question: Questions) => {
            if (question.id === selectedQuestionId) {
                selectedQuestion = question;
            }
        });
        }); 
    }

  const handleAddAnswer = () => {
    userResult.answers.push(
      {
        answerId: nanoid(),
        question: selectedQuestion.question,
        option1: selectedQuestion.option1,
        option2: selectedQuestion.option2,
        option3: selectedQuestion.option3,
        option4: selectedQuestion.option4,
        rightAnswer: selectedQuestion.rightAnswer,
        optionChoosed: userChoice
      }
    );

    updateResults(userResult);

    openNotification("Add Answer Status", "Add Answer Succesfully");

  }

  const handleDeleteAnswer = (answerId: string) => {
    const updatedAnswers = userResult.answers.filter((answer: any) => answer.answerId !== answerId)

    userResult.answers = updatedAnswers;
    updateResults(userResult);
    openNotification("Delete Answer Status", "Delete Answer Succesfully");
  }

  const handleEditAnswer = (option: string, answerId: string) => {
    const updatedAnswers = userResult.answers.map((answer: any) => {
      if(answer.answerId === answerId) {
        return {
          ...answer,
          optionChoosed: option
        }
      }
      return answer;
    })

    userResult.answers = updatedAnswers;
    updateResults(userResult);
    setAnswerEditable("");
    openNotification("Update Answer Status", "Update Answer Succesfully");

  }

  const updateResults = (updatedResult: any) => {
    const updatedResults = results.map((result: any) => {
      return result.id === updatedResult.id ? updatedResult : result;
    })

    localStorage.setItem('userResults', JSON.stringify(updatedResults));
    setResults(updatedResults);
    setSelectedQuestionId("");
    setUserChoice("");
  }

  return (
    <div className="edit-result-screen">
      <div>{contextHolder}</div>
      <h2 className="edit-result-title"> Edit Result </h2>
      <div className="result-info-select-container">
        <div className="result-info">
          <p><strong>Name: </strong>{userResult.name}</p>
          <p><strong>Time: </strong> {convertTime(userResult.time)}</p>
          <p><strong>Date: </strong>{generateAbbreviatedDate(userResult.date)}</p>
        </div>

        <div className="select-container">
          <div className="select-label-container">
            <label>Questions</label>
            <select 
              className="select-question"
              onChange={changeSelectOptionHandler}>
                <option hidden selected>...</option>
              {
                questionData.map((tuple: Tuples) => {
                  return tuple.questions.map((question: Questions) => (
                    <option 
                      key={question.id} 
                      value={question.id}>
                      {question.question} 
                    </option>
                  ))
                })
              }
            </select>
          </div>

          {selectedQuestionId !== "" && <div className="select-label-container specifig-width">
            <label>Options</label>
            <select
              className="select-option"
              onChange={changeSelectChoiceHandler}>
                <option hidden selected>...</option>
                {
                  ["1", "2", "3", "4"].map((option: string) => (
                    <option
                      key={option}
                      value={option}>
                        {selectedQuestion['option' + option as keyof Questions]} 
                        {' '}
                        {option === selectedQuestion.rightAnswer ? <>&#x2713;</> : ''}
                    </option>
                  ))
                }
            </select>
          </div>}

        <Button
          className={"answer-version add-tuple-btn " 
          + (selectedQuestionId === "" || userChoice === ""
          ? "low-opacity" : "")}
          onClick={() => handleAddAnswer()}
          disabled={selectedQuestionId === "" || userChoice === ""}>
          Add Answer
        </Button>

        </div>
      </div>

      <div className="answer-container">
          <div>
            {userResult.answers.map((answer: any) => (
              <ul className="result-box" key={answer.answerId}>
                <div className="question-x-btn-container">
                  <Button 
                    className="icon-container"
                    onClick={() => setAnswerEditable(answer.answerId)}
                  >
                    <EditOutlined className="icon" />
                  </Button>

                  <li>
                    {answer.question} 
                  </li>

                  <Popconfirm 
                    title="delete this answer?" 
                    description="Are you sure to delete this answer?"
                    onConfirm={() => handleDeleteAnswer(answer.answerId)}
                    okText="Yes" cancelText="No">
                    <Button className="x-btn ">                    
                      <CloseOutlined className="icon"/> 
                    </Button>
                  </Popconfirm>
                </div>
                <div className="option-container">

                {
                  ["1", "2", "3", "4"].map((option) => (
                    <li key={option}

                    onClick={() => handleEditAnswer(option, answer.answerId)}
                      className={
                        answerEditable !== answer.answerId 
                        ?  (
                          answer.rightAnswer ===  option
                          ? "true disabled" 
                          : answer.rightAnswer !==  option && answer.optionChoosed === option 
                          ? "false disabled"
                          : "disabled"
                        ) 
                        :
                        ""
                  }
                      >
                        <span className="space">{option}.</span> {answer["option" + option]}
                    </li>
                  )
                )}

                </div>
              </ul>
              ))}
          </div>


          <Button 
            className="back-icon-container no-position"
            onClick={() => navigate("/managed-results")}>
            <ArrowLeftOutlined className="back-icon" />
          </Button>
      </div>
    </div>
  );
};

export default EditResultScreen;
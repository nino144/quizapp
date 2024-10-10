import React, { useState, useEffect } from "react";
import { Button, Popconfirm, notification } from 'antd';
import {  EditOutlined, CloseOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Tuples } from "../types/Tuples";
import { Questions } from "../types/Questions";

interface ManagedQuestionsProps {
  questions: Questions[];
  setTuples: (tuple: Tuples[]) => void;
}

//BACK LATER
const ManagedQuestions: React.FC<ManagedQuestionsProps> = ({questions, setTuples}) => {
  useEffect(()=> {
    const allowedKeys = ['1', '2', '3', '4', 'Delete', 'ArrowLeft', 'ArrowRight', 'Backspace'];

    const rightAnswerElement = document.querySelector('#rightAnswer');

    if (rightAnswerElement) {
        rightAnswerElement.addEventListener('keydown', async (e: any) => {
            if (!allowedKeys.includes(e.key)) {
                e.preventDefault();
                return false;
            }
        });
    }
  }, []);

  const items = JSON.parse(localStorage.getItem('questionData') || '[]');
  const [editable, setEditable] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    api["info"]({
      message: message,
      description: description,
    });
  };

  if(questions.length === 0) {
    return (
      <div className="tuple question-ver center">
        <p>No Question Yet!</p>
      </div>
    )
  }

  const handleDeleteQuestion = (id: string) => {
    openNotification("Delete Question Status", "Delete Question Succesfully");

    const updatedTuples: Tuples[] = items.map((item: Tuples) => {
      return {
        ...item,
        questions: item.questions.filter((question) => question.id !== id)
      }
    });

    localStorage.setItem('questionData', JSON.stringify(updatedTuples));
    setTuples(updatedTuples);
  }

  const updateQuestion = (propertyName: string, value: string) =>{
    const updatedTuples: Tuples[] = items.map((item: Tuples) => {
      return {
        ...item,
        questions: item.questions.map((question) => {
          if (question.id === editable) {
            return {
              ...question,
              [propertyName]: value
            }
          }
          return question;
        })
      }
    });

    localStorage.setItem('questionData', JSON.stringify(updatedTuples));
    setTuples(updatedTuples);
    setEditable("");
    openNotification("Update Question Status", "Update Question Succesfully");

  }

  const handleEdit = (id: string) => {
    id === editable ? setEditable("") : setEditable(id);
  }

  return (
    <div>
        <div>{contextHolder}</div>

        {questions.map((question, index) => (
          <div key={index}>
            <div className="tuple question-ver">
              <div 
                className="tuple-title">
                <Button 
                  className="icon-container"
                  onClick={() => handleEdit(question.id)}>
                  <EditOutlined className="icon" />
                </Button>

                  <Popconfirm 
                    title="delete this question?" 
                    description="Are you sure to delete this question?"
                    onConfirm={() => handleDeleteQuestion(question.id)}
                    okText="Yes" cancelText="No"
                  >
                <Button 
                  className="x-btn">
                  <CloseOutlined className="icon" />
                </Button>

                </Popconfirm>
              </div>

              <p                 
                  className={"big-font-size question-text " + (
                  editable === question.id ? "carret" : ""
                )}
                onBlur={e => {
                  setLoading(false);
                  updateQuestion("question", e.currentTarget.textContent || '')}
                }

                onFocus= {() => {
                  setLoading(true);
                  }
                }

                contentEditable={editable === question.id ? "true" : "false"}
                suppressContentEditableWarning={true}>
                {question.question}
              </p>

              <div className="question-option">
              {
                ["1", "2", "3", "4"].map((option: string, index) => (
                  <div className="index-and-option" key={index}>
                    <p>{index + 1}.</p>
                    <p 
                      className={"big-font-size " + (
                        editable === question.id ? "carret" : ""
                      )}
                      onBlur={e => {
                        setLoading(false);
                        updateQuestion("option" + option, e.currentTarget.textContent || '')}
                      }
      
                      onFocus= {() => {
                        setLoading(true);
                        }
                      }                      
                      
                      contentEditable={editable === question.id ? "true" : "false"}
                      suppressContentEditableWarning={true}>
                      {question["option" + option as keyof Questions]}
                    </p>
                  </div>
                )
              )}
              </div>

              <div className="right-answer-container">
                {(!loading || editable !== question.id) && <CheckOutlined className="checkIcon" />}
                {(loading && editable === question.id) && <LoadingOutlined className="checkIcon" />}

                <p 
                  className={"big-font-size " + (
                    editable === question.id ? "carret" : ""
                  )}
                  id="rightAnswer"
                  onBlur={e => {
                    setLoading(false);
                    updateQuestion("rightAnswer", e.currentTarget.textContent || '')}
                  }
  
                  onFocus= {() => {
                    setLoading(true);
                    }
                  }
                  contentEditable={editable === question.id ? "true" : "false"}
                  suppressContentEditableWarning={true}>
                  {question.rightAnswer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ManagedQuestions;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTupleForm from "./AddTupleForm";
import ManagedQuestions from "./ManagedQuestions";
import { Button, Popconfirm, notification } from 'antd';
import { ArrowLeftOutlined, CaretDownOutlined, CaretUpOutlined, EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Tuples } from "../types/Tuples";


const ManagedTuplesScreen: React.FC = () => {
  const navigate = useNavigate(); 
  const items: Tuples[] = JSON.parse(localStorage.getItem('questionData') || '[]');
  const [tuples, setTuples] = useState<Tuples[]>(items);
  const [showQuestions, setShowQuestions] = useState<string>("");
  const [addTuple, setAddTuple] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [editable, setEditable] = useState<string>("");

  const openNotification = (message: string, description: string) => {
    api["info"]({
      message: message,
      description: description,
    });
  };

  const handleDeleteTuple = (id: string) => {
    openNotification("Delete Tuple Status", "Delete Tuple Succesfully");

    const updatedTuples: Tuples[] = tuples.filter((tuple: Tuples) => {
      return tuple.id !== id;
    })

    localStorage.setItem('questionData', JSON.stringify(updatedTuples));
    setTuples(updatedTuples);
  }

  const handleAddQuestion = (id: string) => {
    localStorage.setItem('tupleId', JSON.stringify(id));
    navigate("/add-question");
  }

  const getQuestionsNumber = () => {
    let numbers: number = 0;
    tuples.forEach((tuple: Tuples) => {
      numbers += tuple.questions.length;
    })
    return numbers;
  }

  const handleEdit = (id: string) => {
    id === editable ? setEditable("") : setEditable(id);
  }

  const updateTuple = (propertyName: string, value: string) =>{
    const updatedTuples = tuples.map((tuple: Tuples) => {
      if (tuple.id === editable) {
        return {
          ...tuple,
          [propertyName]: value
        }
      }
        return tuple;
    })

    localStorage.setItem('questionData', JSON.stringify(updatedTuples));
    setTuples(updatedTuples);    
    setEditable("");
    openNotification("Update Tuple Status", "Update Tuple Succesfully");
  }

  return (
    <div>
      <div className="top">
        <h2 className="tuple-label">Tuple Management</h2>
      </div>

      <div className="total-tuple-box">
        <div className="flex-container">
          <p> {tuples.length} </p>
          <p>Tuples</p>
        </div>
        <div className="flex-container">
          <p>{getQuestionsNumber()}</p>
          <p>Questions</p>
        </div>
      </div>

      <div>
        {contextHolder}
      </div>

      <div className="bottom">
        <div className="tuple-btn-container">
          <Button
            className="add-tuple-btn"
            onClick={() => setAddTuple(!addTuple)}>
            Add Tuple
          </Button>
        </div>

        {addTuple && <AddTupleForm
          setTuples={setTuples}
        />}

        {tuples.map((tuple, index) => (
          <div key={index} >
            <div className="tuple" >
              <div 
                className="tuple-title">
                <Button 
                  className="add-question-btn"
                  onClick={() => handleAddQuestion(tuple.id)}>
                    <PlusOutlined className="icon"/>
                </Button>

                <Button 
                  className="icon-container"
                  onClick={() => handleEdit(tuple.id)}
                  
                  >
                  <EditOutlined className="icon"/>
                </Button>

                <Popconfirm 
                  title="delete this task?" 
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDeleteTuple(tuple.id)}
                  okText="Yes" cancelText="No"
                >
                  <Button className="x-btn">
                    <CloseOutlined className="icon"/>
                  </Button>
                </Popconfirm>
              </div>

              <p 
                className={"big-font-size " + (
                  editable === tuple.id ? "carret" : ""
                )}
                onBlur={e => {updateTuple("title", e.currentTarget.textContent || '');}}
                contentEditable={editable === tuple.id ? "true" : "false"}
                suppressContentEditableWarning={true}>
                {tuple.title}
              </p>

              <p 
                className={"long-text " + (
                  editable === tuple.id ? "carret" : ""
                )}
                onBlur={e => {updateTuple("description", e.currentTarget.textContent || '');}}
                contentEditable={editable === tuple.id ? "true" : "false"}
                suppressContentEditableWarning={true}>
                {tuple.description}
              </p>

              <div className="tuple-title">
                <p>Questions {tuple.questions.length}</p>

                {!(showQuestions  === tuple.id) && <Button 
                  className="down-icon"
                  onClick={() => setShowQuestions(tuple.id)}>
                  <CaretDownOutlined className="icon"/>
                </Button>}

                {(showQuestions === tuple.id) && <Button
                  className="down-icon"
                  onClick={() => setShowQuestions("")}>
                  <CaretUpOutlined className="icon"/>
                </Button>}
              </div>
            </div>
             
            {(showQuestions === tuple.id) && <ManagedQuestions
              key={tuple.id} 
              questions={tuple.questions}
              setTuples={setTuples}
            />}

          </div>
        ))}

        <div className="btn-container">
          <Button
            htmlType="button" 
            className="start-btn"
            onClick={() => navigate("/managed")}>
              <ArrowLeftOutlined />
          </Button>
        </div> 
      </div>
    </div>
  );
};

export default ManagedTuplesScreen;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { Tuples } from "../types/Tuples";

const SelectedQuestionScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const navigate = useNavigate(); 
  const items: Tuples[] = JSON.parse(localStorage.getItem('questionData') || '[]');
  const userName: string = JSON.parse(localStorage.getItem('name') || '[]');
  const [form] = Form.useForm(); 

  const onFinish = () => {
    localStorage.setItem('tuple', JSON.stringify(selectedOption));
    navigate("/quiz");
  }

  if(items.length === 0 || userName === null) {
    let title = "";
    items.length === 0 ? title = "No Tuple Available Yet!" : title = "Enter name first";

    return (
      <div className="answer-container center">
        <div className="center">
          <p className="title no-margin">
            {title}
          </p>
        </div>

        <Button 
          className="start-btn" 
          onClick ={() => navigate("/")}>
          Start Quiz Again
        </Button>
      </div>
    );
  }

  return (
    <Form 
      form={form}
      name="select_tuple_form"
      className="select-tuple-form" 
      onFinish={onFinish}>
      <div className="top">
        <div className="user"><strong>User:</strong> {userName}</div>
        <h2 className="tuple-label">Please select question tuple:</h2>
      </div>

      <div className="bottom">
        {items.map((item: Tuples, index) => (
          <div 
            key={index}
            className={"tuple " + (index === selectedOption ? "choosed" : "")}
            onClick={() => setSelectedOption(index)}>
            <p><strong>{item.title}</strong></p>
            <p>{item.description}</p>
            <p>Questions: {item.questions.length}</p>
          </div>
        ))}
        <div className="btn-container">
          <Button 
            htmlType="submit" className="start-btn">
            Start Quiz
          </Button>
        </div>

        <Button 
          className="back-icon-container no-position"
          htmlType="button"
          onClick={() => navigate("/enter-name")}>
          <ArrowLeftOutlined className="back-icon" />
        </Button>
      </div>

    </Form>
  );
};

export default SelectedQuestionScreen;

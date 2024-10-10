import React from "react";
import { useNavigate } from "react-router-dom";
import { Questions } from "../types/Questions";
import { Button, Form, Input, InputNumber, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tuples } from "../types/Tuples";

const AddQuestionScreen: React.FC = () => {
  const navigate = useNavigate(); 
  const items: Tuples[] = JSON.parse(localStorage.getItem('questionData') || '');
  const tupleId: string = JSON.parse(localStorage.getItem('tupleId') || '');

    const getLatestId = () => {
        let max: number = 1; 
    
        items.forEach((item: Tuples) => {
            item.questions.forEach((i) => {
                const currentId = parseInt(i.id);
                if (currentId > max) {
                max = currentId;
                }
            });
        });
    
        return String(max + 1);
    }

  const addQuestion = (question: Questions) => {
    const index = items.findIndex(item => item.id === tupleId);
    items[index].questions.splice(items[index].questions.length, 0, question);
    localStorage.setItem('questionData', JSON.stringify(items));
  }

  const [form] = Form.useForm(); 

  const onFinish = (values: any) => {      
    const newQuestion: Questions = {
      id: getLatestId(),
      question: values.question,
      option1: values.option1,
      option2: values.option2,
      option3: values.option3,
      option4: values.option4,
      rightAnswer: values.right_answer
    };

    addQuestion(newQuestion);
    console.log(newQuestion);
    form.resetFields(); 
  }

  return (
    <Form name="form" form={form} className="form" onFinish={onFinish}>
      <h2 className="bonded-text">Add Question Form</h2>
      {/* <Space.Compact block  size="small" align="center" direction="vertical"> */}
      <Space.Compact block  size="small" direction="vertical">
        <Form.Item name="question" label="question" hasFeedback
          rules={[{ required: true, message: 'Please enter option question' }]}>
          <Input className="form-input" placeholder="Add a new question"/>
        </Form.Item>

        {
        ["1", "2", "3", "4"].map((option) =>(
          <Form.Item name={"option" + option} label={"option" + option} hasFeedback
            rules={[{ required: true, message: 'Please enter option value' }]}>
              <Input className="form-input" placeholder="Add value for option " />
          </Form.Item>
        ))
        }
       
        <Form.Item name="right_answer" label="* Right answer" hasFeedback>
          <InputNumber className="form-input" placeholder="right answer"
            min={1} max={4} step={1} defaultValue={1}/>
        </Form.Item>

        <Form.Item>
          <Button className="sumbit-btn" htmlType="submit">Add</Button>
        </Form.Item>

        <Form.Item>
          <Button 
            className="no-position back-icon-container" 
            style={{ borderRadius: "50%"}}
            htmlType="button"
            onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="back-icon"/>
          </Button>
        </Form.Item>
      </Space.Compact >
    </Form>
  );
};

export default AddQuestionScreen;
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const EnterNameScreen: React.FC = () => {
  const navigate = useNavigate(); 
  const [form] = Form.useForm();

  const onFinish = (values: any) => {     
    localStorage.setItem('name', JSON.stringify(values.user_name));
    form.resetFields();
    navigate("/selected-question");
  }

  return (
    <Form name="enter-name" form={form} onFinish={onFinish}>
      <div className="start-screen">
      <img className="start-image" src="https://imageio.forbes.com/specials-images/imageserve/5ffca623a629b75c1717b82e/Choosing-a-business-name/960x0.jpg" alt="img" />

      <Form.Item name="user_name" label="User name" hasFeedback
        rules={
          [
            { required: true, message: 'Please enter name to start' },
            { min: 3, message: 'Name must be at least 3 characters' }
          ]
        }
      >
        <Input className="form-input" placeholder="Name here"/>
      </Form.Item>
     
      <div className="btn-container near-bottom-edge-position">
      <Form.Item>
        <Button 
          className="start-btn" 
          htmlType="submit">
          Star Quiz
        </Button>
      </Form.Item>


      </div>
      </div>

      <Button 
        className="back-icon-container near-bottom-edge-position"
        onClick={() => navigate("/choose-screen")}>
        <ArrowLeftOutlined className="back-icon" />
      </Button>
    </Form>
  );
};

export default EnterNameScreen;
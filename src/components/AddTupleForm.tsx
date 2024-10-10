import React from "react";
import { Button, Form, Input, notification } from 'antd';
import { Tuples } from "../types/Tuples";

interface AddTupleFormProps {
  setTuples: (tuple: Tuples[]) => void;
}

const AddTupleForm: React.FC<AddTupleFormProps> = ({setTuples}) => {
    const items: Tuples[] = JSON.parse(localStorage.getItem('questionData') || '[]');
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm(); 

    const openNotification = (message: string, description: string) => {
        api["info"]({
        message: message,
        description: description,
        });
    };

    const getLatestId = () => {
        let max: number = 1; 

        items.forEach((item: Tuples) => {
            const currentId = parseInt(item.id);
            if (currentId > max) {
                max = currentId;
            }
        });

        return String(max + 1);
    }

    const addTuple = (tuple: Tuples) => {
        items.splice(items.length, 0, tuple);
        localStorage.setItem('questionData', JSON.stringify(items));
        setTuples(items);
        openNotification("Add Tuple Status", "Add Tuple Succesfully");
    }

  const onFinish = (values: any) => {    
      const date = new Date().toLocaleString();  
      const newTuple: Tuples = {
          id: getLatestId(),
          title: values.title,
          description: values.description,
          dateCreated: date,
          questions: []
      };

      addTuple(newTuple);
      form.resetFields(); 
  }

  return (
    <>
      <div>{contextHolder}</div>

      <Form 
        form={form}
        className="add-tuple-form" 
        name="AddTupleForm"
        onFinish={onFinish}
        >
        <h2 className="bonded-text">New Tuple</h2>
        
        <Form.Item
          name="title"
          label="title"
          hasFeedback
          rules={
            [
              { required: true, message: 'Please enter tuple title' },
              { min: 3, message: 'Title must be at least 3 characters' }
            ]
          }
          >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          name="description"
          label="description"

          hasFeedback
          rules={
            [
              { required: true, message: 'Please enter description' },
              { min: 3, message: 'description must be at least 3 characters' }
            ]
          }>
          <Input className="form-input"/>
        </Form.Item>

        <Form.Item>
          <Button className="sumbit-btn" htmlType="submit">Add
          </Button>
        </Form.Item>

      </Form>
    </>
  );
};

export default AddTupleForm;
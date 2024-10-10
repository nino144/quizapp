import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertTime } from '../util/TimeUtil';
import { generateAbbreviatedDate } from '../util/DateUtil';
import { nanoid } from 'nanoid';
import { ArrowLeftOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Form, Input, Space, Divider, notification  } from 'antd';

const ManagedResultsScreen: React.FC = () => {
  const navigate = useNavigate(); 
  const allResults = JSON.parse(localStorage.getItem('userResults') || '[]');
  const [results, setResults] = useState<any>(allResults);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const openNotification = (message: string, description: string) => {
    api["info"]({
      message: message,
      description: description,
    });
  };

  if(results === null) {
    return (
      <div className="answer-container center">
        <div>
          <div className="center">
            <p className="title no-margin">No Results Yet!</p>
          </div>

          <Button 
            className="back-icon-container" 
            onClick ={() => navigate("/managed")}>
            <ArrowLeftOutlined className="back-icon"/>
          </Button>
        </div>
      </div>
    )
  }

  const getUserTotalQuestions = () => {
    let questionsCount = 0;
    results.forEach((result: any) => {
      questionsCount += result.answers.length;
    })

    return questionsCount;
  }

    const getUserTotalTime = () => {
        let timeCount = 0;
        results.forEach((result: any) => {
        timeCount += result.time;
        })
        return timeCount;
    }

    const getAllUsers = () => {
        let userNameArr: string[] = [];
        results.forEach((result: any) => {
            if(!userNameArr.includes(result.name)) {
                userNameArr.push(result.name);
            }
        })
        return userNameArr.length;
    }


  const allQuestions = getUserTotalQuestions();
  const allTime = getUserTotalTime();
  const allUsers =  getAllUsers();

  const generateAbbreviatedName = (name: string) => {
    let result = "";
    name = " " + name;
    let nameArr = name.split(" ");
    nameArr.length > 2  ? result += nameArr[1].charAt(0) + nameArr[2].charAt(0) : result += nameArr[1].charAt(0);
    return result;
  }

  const handleDeleteResult = (id: string) => {
    const updatedResults = results.filter((result: any) => {
     return result.id !== id;
    })

    console.log(updatedResults);
    localStorage.setItem('userResults', JSON.stringify(updatedResults));
    setResults(updatedResults);
    openNotification("Delete Result Status", "Delete Result Succesfully");
  }

  const handleUpdateResult = (id: string) => {
    localStorage.setItem('resultId', JSON.stringify(id));
    navigate("/edit-results");
  }

  const onFinish = (values: any) => {
    const newResult = {
      id: nanoid(), 
      name: values.user_name_input, 
      date: new Date().toLocaleDateString(), 
      answers: [], 
      time: 0, 
    };
  
    setResults([...results, newResult]);
    localStorage.setItem('userResults', JSON.stringify([...results, newResult]));
    form.resetFields(); 
    openNotification("Add Result Status", "Add Result Succesfully");

  }
  
  return (
    <div className="managed-result-screen-container">
      <div>{contextHolder}</div>
      <h2 className="results-title"> Result Management </h2>
      <div className="result-overview">
        <div className="statistics">
          <p>Players</p>
          <p>{allUsers}</p>
        </div>
        <Divider type="vertical" className="divider"/>
        <div className="statistics">
          <p>Results</p>
          <p>{results.length}</p>
        </div>
        <Divider type="vertical" className="divider"/>
        <div className="statistics">
          <p>Questions</p>
          <p>{allQuestions}</p>
        </div>
        <Divider type="vertical" className="divider"/>
        <div className="statistics">
          <p>Time</p>
          <p>{convertTime(allTime)}</p>
        </div>
      </div>

      <div>
        <Form form={form} name="result_form" className="result-form" onFinish={onFinish}>
          <Space.Compact direction="horizontal" 
            style={{height: "33px", marginTop:"20px", marginBottom: "20px"}}>
            <Form.Item name="user_name_input" hasFeedback
              rules={
                [
                  { required: true, message: 'Please enter user name to add result' },
                  { min: 3, message: 'Name must be at least 3 characters' }
                ]
              }>
              <Input className="user-name-input" placeholder="Enter name" />
            </Form.Item>

            <Form.Item>
              <Button className="add-tuple-btn" htmlType="submit">
                Add Result
              </Button>
            </Form.Item>
          </Space.Compact>
        </Form>
      </div>

      <div className="infomation">
        <div className="result-record record-title">
          <p>Player</p>
          <p>Date</p>
          <p>Questions</p>
          <p>Time</p>
          <p>Action</p>
        </div>

        {
          results.map((result: any)=>{
            return (
            <div className="result-record" key={result.id}>
              <p><span className="name-abbreviation">{generateAbbreviatedName(result.name)}</span>{result.name}</p>
              <p>{generateAbbreviatedDate(result.date)}</p>
              <p>{result.answers.length}</p>
              <p>{convertTime(result.time)}</p>
              <p className="action-container">
                <Button
                  className="icon-container"
                  onClick={() => handleUpdateResult(result.id)}>
                  <EditOutlined className="icon"/> 
                </Button>

                <Popconfirm 
                  title="delete this result?" 
                  description="Are you sure to delete this result?"
                  onConfirm={() => handleDeleteResult(result.id)}
                  okText="Yes" cancelText="No">
                  <Button className="x-btn no-margin">                    
                    <CloseOutlined className="icon"/> 
                  </Button>
                </Popconfirm >
              </p>
            </div>
            );
          })
        }
      </div>
      <Button 
        className="back-icon-container no-position"
        onClick={() => navigate("/managed")}>
        <ArrowLeftOutlined className="back-icon" />
      </Button>
    </div>
  );
};

export default ManagedResultsScreen;
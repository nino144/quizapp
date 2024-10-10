import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ChooseScreen: React.FC = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <div className="managed-screen-container">
        <Button
          onClick={() => navigate("/managed")}>
          Quiz Management
        </Button>

        <Button
          onClick={() => navigate("/enter-name")}>
          Quiz
        </Button>
      </div>

      <Button
        className="back-icon-container"
        onClick={() => navigate("/")}>
        <ArrowLeftOutlined className="back-icon" />
      </Button>
    </div>

  );
};

export default ChooseScreen;
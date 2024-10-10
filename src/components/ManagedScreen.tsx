import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ManagedScreen: React.FC = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <div className="managed-screen-container">
        <Button
          onClick={() => navigate("/managed-tuples")}>
          Managed Tuples
        </Button>
        <Button
          onClick={() => navigate("/managed-results")}>
          Managed Results
        </Button>
      </div>

      <Button
        className="back-icon-container"
        onClick={() => navigate("/choose-screen")}>
        <ArrowLeftOutlined className="back-icon" />
      </Button>
    </div>

  );
};

export default ManagedScreen;
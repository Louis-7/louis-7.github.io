import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageCurl.css';

const PageCurl: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/farm');
  };

  return (
    <div 
      className="page-curl-container" 
      onClick={handleClick} 
      title="Go to Farm"
      role="button"
      aria-label="Go to Farm Page"
    />
  );
};

export default PageCurl;

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button 
      onClick={goBack} 
      className="back-button"
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const FinishingStatus = ({onNext, onStepComplete}) => {
 const [progress, setProgress] = useState(0); // Starting at 12%
 const navigate = useNavigate()

 const handlenav = () => {
  navigate('/book_keeping');
 }
 
   useEffect(() => {
     const interval = setInterval(() => {
       setProgress(prev => (prev < 100 ? prev + 1 : 100));
     }, 500);
 
     return () => clearInterval(interval);
   }, []);
 
   return (
     <div className="sync-container">
        <div className="checkmark-svg">
                        <svg
                            className="checkmark-animated"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#16A34A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                        <circle className="checkmark-circle" cx="12" cy="12" r="10" />
                        <path className="checkmark-check" d="M9 12l2 2 4-4" />
                        </svg>
                    </div>
       <h2>You're all set!</h2>
       <p>The sync process has started in the background,<br />you’ll be notified once it’s complete</p>
 
       <div className="progress-bar-wrapper">
        <div className='progress-text'>
            <div className='synchronize-text'>synchronize in progress</div>
            <div className="progress-text">{progress}%</div>
        </div>
         <div className="progress-bar">
           <div className="progress-fill" style={{ width: `${progress}%` }}></div>
         </div>
         
       </div>
 
       <div className="info-box">
         <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B40D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>

        </span> You can also track sync progress directly from your dashboard.
       </div>
 
       <div className="buttons" onClick={handlenav}>
         <button className="start-button">Let’s get started</button>
       </div>
     </div>
  );
}
export default FinishingStatus;

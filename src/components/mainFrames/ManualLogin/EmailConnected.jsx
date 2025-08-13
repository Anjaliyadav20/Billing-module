import React,{ useState } from "react";



const EmailConnected = ({onNext, onStepComplete}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

        const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
      };
      
      if (isSubmitted) {
        onStepComplete()
        // return (
        //   <ConnectAcc onNext={onNext} onStepComplete={onStepComplete}/>
        // );
      }
    
  return (
    <div className="email-connected-container">
        {/* <div className="email-connected-inner"></div> */}
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

                    <div className="heading">Email Connected</div>
                        <p>
                            You’re all set, we’ll now start fetching bills and <br/>documents automatically from
                        </p>
                    <div className="input-wrapper">
                        <input type="email" value="alma.lawson@example.com" readOnly />

                        <span className="mail-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                        </span>

                        <span className="check-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </span>
                    </div>
                    <button className="next-step-btn" onClick={handleSubmit}>Next Step</button>
    </div>
  );
}
export default EmailConnected;

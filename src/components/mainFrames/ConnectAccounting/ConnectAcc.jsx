// ConnectAccounting.jsx

import React, { useState } from 'react';
import xero from "../../assets/Images/companies_logo/Xero.svg";
import QuickBooks from "../../assets/Images/companies_logo/QuickBooks.svg"
import ViewpointVista from "../../assets/Images/companies_logo/ViewpointVista.svg"
import Hilti from "../../assets/Images/companies_logo/HILTI.svg"
import HComp from "../../assets/Images/companies_logo/HComp.svg"
import Fieldwire from "../../assets/Images/companies_logo/Fieldwire.svg"
import XeroLoginForm from './XeroLoginForm';


const softwares = [
  { 
    icon: xero,
    name: 'Xero' 
  },
  { 
    icon: QuickBooks,
    name: 'QuickBooks' 
  },
  { 
    icon: ViewpointVista,
    name: 'Viewpoint Vista' 
  },
  { 
    icon: Hilti,
    name: 'Hilti' 
  },
  { 
    icon: HComp,
    name: 'Viewpoint Vista' 
  },
  { 
    icon: Fieldwire,
    name: 'Fieldwire' 
  },
];

const ConnectAcc = ({onStepComplete, handleBack, handleSkip}) => {
  const [showXeroLogin, setShowXeroLogin] = useState(false);
  const [connectedSoftwares, setConnectedSoftwares] = useState([]);
  const [activeSoftware, setActiveSoftware] = useState(null);
  const [activeSoftwareIcon, setActiveSoftwareIcon] = useState(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
          const handleSubmit = (e) => {
          e.preventDefault();
          setIsSubmitted(true);
        };

        if (isSubmitted) {  
          onStepComplete()        
          // return (
          //   <ImportContacts onNext={onNext} onStepComplete={onStepComplete}/>
          // );
        }


  const handleSoftwareConnected = (softwareName) => {
    if (!connectedSoftwares.includes(softwareName)) {
      setConnectedSoftwares(prev => [...prev, softwareName]);
    }
    setActiveSoftware(null);


  };

  return (
    <div className="connect-accounting">
        <div className="accounting-inner">
            <div className='accounting-top'>
                <p className="step-count">STEP 2 OF 5</p>
                <div className='heading'>Sync Accounting Software</div>
                <p className="subtext">
                    One-click setup to integrate your books with our billing system
                </p>

                <div className="software-grid" >
                {softwares.map((software, index) => {
              const isConnected = connectedSoftwares.includes(software.name);
              return (
                <div
                  key={index}
                  className={`software-card ${isConnected ? 'connected' : ''}`}
                  onClick={() => {
                    setActiveSoftwareIcon(software.icon)
                    setActiveSoftware(software.name)}}
                >
                  <div className='software-grid-inner'>
                    <div className="icon-placeholder">
                      <img src={software.icon} alt={software.name} />
                    </div>
                    <p>{software.name}</p>
                    {isConnected && (
                      <span className="status-badge">Connected</span>
                    )}
                  </div>
                </div>
              );
            })}
                </div>
          </div>
          <div className="button-group">
                    <button className="back-btn" onClick={handleBack}>
                    &larr; Back
                    </button>
                    <div className='flex' >
                        <button className="skip-btn" onClick={handleSkip}>
                        Skip
                        </button>
                        <button className="next-btn" onClick={handleSubmit}>
                        Next Step
                        </button>
                    </div>
          </div>
          {activeSoftware && (
                    <XeroLoginForm
                      softwareName={activeSoftware}
                      softwareIcon={activeSoftwareIcon}
                      onClose={() => setActiveSoftware(null)}
                      onSubmit={() => handleSoftwareConnected(activeSoftware)}
                    />
                  )}
       </div>
    </div>
  );
};

export default ConnectAcc;

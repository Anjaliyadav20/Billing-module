import React, { useState, useEffect } from 'react';

const ImportContacts = ({onStepComplete, handleBack, handleSkip }) => {
  const [progress, setProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const foundData = {
    contacts: 525,
    duplicates: 101,
    errors: 10
  };

  useEffect(() => {
    let interval;
    if (isImporting && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(interval);
            setShowToast(true);
            return 100;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isImporting, progress]);

  const startImport = () => {
    setProgress(0);
    setIsImporting(true);
  };

  const cancelImport = () => {
    setIsImporting(false);
    setProgress(0);
  };

  return (
    <div className="import-contacts-wrapper">
      <div className='step-count'>STEP 3 OF 5</div>
      <div className='heading'>Import Contact</div>
      <p className='subtext'>Bring in your suppliers and customers to enable smoother processing</p>

      <div className="info-banner">
        {/* <span> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B40D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>

             Importing contacts from 4 connected platforms, this may take a moment. You can proceed to the next step
             {/* </span> */}
      </div>

      {isImporting && (
        <div className="progress-container">
          <div className="progress-header">
            <span>IMPORT IS COMPLETE</span>
            <span className='progress'>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className='Wefound'>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text-search-icon lucide-text-search"><path d="M21 6H3"/><path d="M10 12H3"/><path d="M10 18H3"/><circle cx="17" cy="15" r="3"/><path d="m21 19-1.9-1.9"/></svg>
                    We’ve found
                </span>
          </div>
          <div className='flex justify-between' style={{alignItems:'center'}}>
              <div className="found-info">
                <span>{foundData.contacts} Contacts</span>
                <span>{foundData.duplicates} Duplicate contacts</span>
                <span>{foundData.errors} Errors</span>
              </div>

              {isImporting && progress < 100 && (
                <button onClick={cancelImport} className="cancel-btn">Cancel</button>
              )}
          </div>
        </div>
      )}

      <div className="button-group">
        <button className="back-btn" onClick={handleBack}>&larr; Back</button>
        <div className='flex'>
                <button className="skip-btn" onClick={handleSkip}>Skip</button>
                {!isImporting && (
                <button className="next-btn" onClick={startImport}>Start Import</button>
                )}
                {isImporting && progress === 100 && (
                <button className="next-btn" onClick={onStepComplete}>Next Step</button>
                )}
        </div>
      </div>

      {/* {showToast && (
        <div className="toast">
          <span>Contact Import is complete. You can still skip this step to avoid import into system.</span>
          <button onClick={() => setShowToast(false)}>×</button>
        </div>
      )} */}
    </div>
  );
};

export default ImportContacts;

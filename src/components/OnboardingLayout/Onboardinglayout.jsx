import React, { useCallback, useState } from 'react';
import ImportContacts from './../mainFrames/ImportContacts/ImportContacts';
import InviteUsers from './../mainFrames/InviteUsers/InviteUsers';
import FinishingStatus from './../mainFrames/FinishSetup/FinishingStatus';
import ConnectAcc from './../mainFrames/ConnectAccounting/ConnectAcc';
import EmailLogin from './../mainFrames/ManualLogin/EmailLogin';
import { OnboardingSidebar } from './OnboardingSidebar';

const OnboardingLayout = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);

    const initialSteps = [
        {
            id: 1,
            title: "Connect Email",
            description: "Connect your inbox to auto-fetch and process bills, quotes, and POs",
            completed: false,
            component: "EmailFlow",
        },
        {
            id: 2,
            title: "Connect Accounting",
            description: "Sync your accounting tool to track and reconcile bills automatically",
            completed: false,
            component: "AccountingConnect",
        },
        {
            id: 3,
            title: "Import Contact",
            description: "Bring in your suppliers and customers to enable smoother processing",
            completed: false,
            component: "ContactImport",
        },
        {
            id: 4,
            title: "Invite Users",
            description: "Invite users to join your workspace and start collaborating",
            completed: false,
            component: "UserInvite",
        },
        {
            id: 5,
            title: "Finish & Launch",
            description: "You're all set up live and let automation take over",
            completed: false,
            component: "FinishSetup",
        },
    ];

    const steps = initialSteps.map((step) => ({
        ...step,
        completed: completedSteps.includes(step.id),
    }));

    const handleStepComplete = useCallback(
        (stepId) => {
            setCompletedSteps((prev) =>
                prev.includes(stepId) ? prev : [...prev, stepId]
            );

            if (stepId < steps.length) {
                setCurrentStep(stepId + 1);
            }
        },
        [steps.length]
    );

    const handleNext = useCallback(() => {
        // handleStepComplete(currentStep);
        if (currentStep) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, handleStepComplete]);

    const handleBack = useCallback(() => {
        if (currentStep > 1) {
            const previousStep = currentStep - 1

            // Remove the previous step from completed steps if it was completed
            setCompletedSteps((prev) => prev.filter((stepId) => stepId !== previousStep))

            // Set the previous step as current (active)
            setCurrentStep(previousStep)
        }
    }, [currentStep]);

    const handleSkip = () => {
        handleNext();
    };

    const renderCurrentStepComponent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <EmailLogin onStepComplete={() => handleStepComplete(1)} />
                )
            case 2:
                return (
                    <ConnectAcc onStepComplete={() => handleStepComplete(2)} handleBack={handleBack} handleSkip={handleSkip} />
                )
            case 3:
                return (
                    <ImportContacts onStepComplete={() => handleStepComplete(3)} handleBack={handleBack} handleSkip={handleSkip} />
                )
            case 4:
                return (
                    <InviteUsers onStepComplete={() => handleStepComplete(4)} handleBack={handleBack} handleSkip={handleSkip}/>
                )
            case 5:
                return (
                    <FinishingStatus onStepComplete={() => handleStepComplete(5)} handleBack={handleBack} handleSkip={handleSkip}/>
                )
            default:
                return (
                    <div>Finished! </div>
                )
        }
    }

    return (
        <div className="onboarding-layout">
            <OnboardingSidebar
                steps={steps}
                currentStep={currentStep}
                completedSteps={completedSteps}
            />
            <main className="onboarding-main flex justify-center align-center">
                {/* <EmailLogin onStepComplete={() => handleStepComplete(1)} /> */}
                {renderCurrentStepComponent()}
            </main>
        </div>
    );
};

export default OnboardingLayout;

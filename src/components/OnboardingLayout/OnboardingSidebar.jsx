// This component cntain Onboarding Left sidebar
import React from 'react';
import { Calendar, Check, Circle } from 'lucide-react';
import Logo from "../assets/logo.png"

export const OnboardingSidebar = ({
    steps,
    currentStep,
    completedSteps
}) => {
    const getStepStatus = (step) => {
    if (step.completed) return "completed"
    if (step.id === currentStep) return "active"
    return "upcoming"
  }
    return (
        <aside className="onboarding-sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src={Logo} alt='Logo Icon' width={"18"} height={"18"} />
                    <span className="logo-text">Quotech</span>
                </div>
            </div>
            <div className="sidebar-content">
                <div className="steps-header">
                    <h3>GET STARTED BY COMPLETING THESE STEPS</h3>
                </div>

                <div className="steps-wrapper">
                    <div className="steps-list">
                        {steps.map((step, index) => (
                            <div key={step.id} className="step-wrapper">
                                {/* Conditional connector */}
                                {index > 0 && (
                                    <div
                                        className={`step-connector ${steps[index - 1].completed ? 'completed' : 'upcoming'}`}
                                    />
                                )}

                                <div
                                    className={`step-item ${step.id === currentStep ? 'active' : ''} ${step.completed ? 'completed' : ''}`}
                                >
                                    <div className="step-indicator">
                                        {step.completed ? (
                                            <div className="step-icon completed">
                                                <Check size={14} />
                                            </div>
                                        ) : (
                                            <div className={`step-icon ${step.id === currentStep ? 'current' : ''}`}>
                                                {step.id === currentStep ? (
                                                    <Circle size={8} fill="currentColor" />
                                                ) : (
                                                    <span className="step-number">{step.id}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="step-content">
                                        <h4 className="step-title">{step.title}</h4>
                                        <p className="step-description">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            <div className="sidebar-footer">
                <div className="demo-section">
                    <h4>Got Question? Schedule a Demo</h4>
                    <p>Specific Requirements to solving issues, we'll get you</p>
                    <button className="demo-button">
                        <Calendar width={"14"} height={"14"} />
                        Schedule a Call
                    </button>
                </div>
            </div>
        </aside>
    );
};

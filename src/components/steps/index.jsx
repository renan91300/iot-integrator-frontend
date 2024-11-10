import React from 'react';
import './style.css';

const StepIndicator = ({ currentStep, totalSteps, onStepClick }) => {
    return (
        <div className="step-indicator">
            {[...Array(totalSteps)].map((_, index) => (
                <React.Fragment key={index}>
                    <div
                        className={`step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''
                            }`}
                        onClick={() => onStepClick(index)} // Permite troca de passo ao clicar
                    >
                        {index + 1}
                    </div>
                    {index < totalSteps - 1 && (
                        <div
                            className={`step-line ${index < currentStep ? 'completed-line' : ''}`}
                        ></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepIndicator;

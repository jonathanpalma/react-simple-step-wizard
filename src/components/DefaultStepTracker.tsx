import * as React from 'react';
import CustomStepTracker from './CustomStepTracker';

function DefaultStepTracker(): JSX.Element {
  return (
    <CustomStepTracker>
      {({ currentStep = 0, steps = [] }) => (
        <div style={{ display: 'block', padding: '25px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {steps.map((step, index) => {
              const key = `${index}-${step}`;
              return (
                <div
                  key={key}
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      borderRadius: '50%',
                      lineHeight: '2rem',
                      height: '30px',
                      width: '30px',
                      border: '0.1rem solid #ff161b',
                      background:
                        currentStep >= index
                          ? 'linear-gradient(#ff161b,#ff009a)'
                          : 'white',
                      color: 'white',
                    }}
                  >
                    {currentStep > index ? '✓' : null}
                  </span>
                  <div>
                    <span>{step ? `${index + 1}. ${step}` : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </CustomStepTracker>
  );
}

export default DefaultStepTracker;

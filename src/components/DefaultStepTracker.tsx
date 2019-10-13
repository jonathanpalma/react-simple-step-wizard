import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StepTrackerProps } from '../common/types';

function DefaultStepTracker({
  currentStep = 0,
  steps = [],
}: StepTrackerProps): JSX.Element {
  return (
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
            <div key={key} style={{ display: 'block', textAlign: 'center' }}>
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
  );
}

DefaultStepTracker.propTypes = {
  currentStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
};

DefaultStepTracker.defaultProps = {
  currentStep: 0,
  steps: [],
};

export default DefaultStepTracker;

import * as React from 'react';
import CustomNavigator from './CustomNavigator';

function DefaultNavigator(): JSX.Element {
  return (
    <CustomNavigator>
      {({ isNextAvailable, isPrevAvailable, nextStep, prevStep }) => (
        <div>
          <button type="button" onClick={prevStep} disabled={!isPrevAvailable}>
            Previous
          </button>
          <button type="button" onClick={nextStep} disabled={!isNextAvailable}>
            Next
          </button>
        </div>
      )}
    </CustomNavigator>
  );
}

export default DefaultNavigator;

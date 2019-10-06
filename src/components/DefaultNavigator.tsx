import * as React from 'react';
import { NavigatorProps } from '../common/types';

function DefaultNavigator({
  isNextAvailable,
  isPrevAvailable,
  nextStep,
  prevStep,
}: NavigatorProps): JSX.Element {
  return (
    <div>
      <button type="button" onClick={prevStep} disabled={!isPrevAvailable}>
        Previous
      </button>
      <button type="button" onClick={nextStep} disabled={!isNextAvailable}>
        Next
      </button>
    </div>
  );
}

export default DefaultNavigator;

import * as React from 'react';
import * as PropTypes from 'prop-types';
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

DefaultNavigator.propTypes = {
  isNextAvailable: PropTypes.bool.isRequired,
  isPrevAvailable: PropTypes.bool.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default DefaultNavigator;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { WizardConsumer } from '../contexts/WizardContext';
import { CustomStepTrackerProps } from '../common/types';

function CustomStepTracker({ children }: CustomStepTrackerProps): JSX.Element {
  return <WizardConsumer>{context => children(context)}</WizardConsumer>;
}

CustomStepTracker.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CustomStepTracker;

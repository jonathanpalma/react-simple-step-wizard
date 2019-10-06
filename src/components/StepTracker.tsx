import * as React from 'react';
import DefaultStepTracker from './DefaultStepTracker';
import { WizardConsumer } from '../contexts/WizardContext';
import { CustomStepTrackerProps } from '../common/types';

function StepTracker({ children }: CustomStepTrackerProps): JSX.Element {
  return (
    <WizardConsumer>
      {context => (children ? children(context) : DefaultStepTracker(context))}
    </WizardConsumer>
  );
}

export default StepTracker;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isFunction } from 'util';
import DefaultStepTracker from './DefaultStepTracker';
import { WizardConsumer } from '../contexts/WizardContext';
import { CustomStepTrackerProps } from '../common/types';

function StepTracker({ children }: CustomStepTrackerProps): JSX.Element {
  return (
    <WizardConsumer>
      {context =>
        children && isFunction(children) ? (
          children(context)
        ) : (
          <React.Fragment />
        )
      }
    </WizardConsumer>
  );
}

StepTracker.propTypes = {
  children: PropTypes.func,
};

StepTracker.defaultProps = {
  children: DefaultStepTracker,
};

export default StepTracker;

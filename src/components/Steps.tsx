import * as React from 'react';
import * as PropTypes from 'prop-types';
import WizardContext from '../contexts/WizardContext';
import { StepsProps } from '../common/types';

function Steps({ children }: StepsProps): JSX.Element {
  return (
    // TODO: fix types error to allow using WizardConsumer instead of WizardContext.Consumer
    <WizardContext.Consumer>
      {context =>
        context.totalSteps > 0
          ? React.Children.map(children, (child: React.ReactElement, index) =>
              context.currentStep === index
                ? React.cloneElement(child, {})
                : null
            )
          : null
      }
    </WizardContext.Consumer>
  );
}

Steps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Steps;

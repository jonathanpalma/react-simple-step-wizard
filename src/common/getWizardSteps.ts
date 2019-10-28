import * as React from 'react';
import Steps from '../components/Steps';
import { WizardSteps } from './types';
import getValidSteps from './getValidSteps';

function getWizardSteps(
  children: JSX.Element | JSX.Element[]
): Omit<WizardSteps, 'currentStep'> {
  let instances = 0;
  let totalSteps = 0;
  let steps: string[] = [];
  React.Children.forEach(children, child => {
    instances = Steps === child.type ? instances + 1 : instances;
    if (instances > 1) {
      throw new Error(`Wizard must only have a single component of type Steps`);
    }
    if (child.type === Steps && child.props.children) {
      const ValidSteps = getValidSteps(child.props.children);
      totalSteps = React.Children.count(ValidSteps);
      React.Children.forEach(ValidSteps, step => {
        if (step) {
          steps = steps.concat(step.props.stepLabel);
        }
      });
    }
  });

  return {
    totalSteps,
    steps,
  };
}

export default getWizardSteps;

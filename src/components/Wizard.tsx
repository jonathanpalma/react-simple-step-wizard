import * as React from 'react';
import Navigator from './Navigator';
import StepTracker from './StepTracker';
import Steps from './Steps';
import WizardContext from '../contexts/WizardContext';
import { WizardProps, WizardState } from '../common/types';

const WizardPropTypes = {
  children(props: WizardProps, propName: string, componentName: string) {
    let error = null;
    React.Children.forEach(props[propName], (child: React.ReactElement) => {
      if (![Navigator, Steps].some(component => component === child.type)) {
        error = new Error(
          `${componentName} children should only include components of types Wizard.Navigator or Wizard.Steps`
        );
      }
    });
    return error;
  },
};

class Wizard extends React.PureComponent<WizardProps, WizardState> {
  // compound components
  static Navigator = Navigator;
  static StepTracker = StepTracker;
  static Steps = Steps;

  // custom prop-types
  static propTypes = {
    children: WizardPropTypes.children,
  };

  constructor(props: WizardProps) {
    super(props);
    let totalSteps = 0;
    let steps: string[] = [];
    React.Children.forEach(props.children, child => {
      if (child.type === Steps && child.props.children) {
        totalSteps = child.props.children.length;
        React.Children.forEach(child.props.children, step => {
          steps = steps.concat(step.props.stepLabel);
        });
      }
    });
    const currentStep = 0;
    const isNextAvailable = currentStep < totalSteps - 1;
    const isPrevAvailable = currentStep > 0;

    // Preventing unnecessary re-renders
    this.state = {
      steps,
      currentStep,
      totalSteps,
      isNextAvailable,
      isPrevAvailable,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
    };
  }

  componentDidUpdate(_: WizardProps, prevState: WizardState) {
    const { currentStep, totalSteps } = this.state;
    if (prevState.currentStep !== currentStep)
      this.setState(
        {
          isNextAvailable: currentStep < totalSteps - 1,
          isPrevAvailable: currentStep > 0,
        },
        () => {
          const { onStepChange } = this.props;
          if (onStepChange) onStepChange(currentStep);
        }
      );
  }

  nextStep = () => {
    if (this.state.isNextAvailable)
      this.setState(prevState => ({
        currentStep: prevState.currentStep + 1,
      }));
  };

  prevStep = () => {
    if (this.state.isPrevAvailable)
      this.setState(prevState => ({
        currentStep: prevState.currentStep - 1,
      }));
  };

  render() {
    return (
      <div>
        <WizardContext.Provider value={this.state}>
          {this.props.children}
        </WizardContext.Provider>
      </div>
    );
  }
}

export default Wizard;

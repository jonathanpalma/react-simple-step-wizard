import * as React from 'react';
import Navigator from './Navigator';
import StepTracker from './StepTracker';
import Steps from './Steps';
import WizardContext from '../contexts/WizardContext';
import callAll from '../common/callAll';
import isInRange from '../common/isInRange';
import {
  WizardProps,
  WizardState,
  WizardHandlers,
  WizardPropGetters,
} from '../common/types';

const WizardPropTypes = {
  children(props: WizardProps, propName: string, componentName: string) {
    let error = null;
    React.Children.forEach(props[propName], (child: React.ReactElement) => {
      if (
        ![Navigator, StepTracker, Steps].some(
          component => component === child.type
        )
      ) {
        error = new Error(
          `${componentName} children should only include components of types Wizard.Navigator or Wizard.Steps`
        );
      }
    });
    return error;
  },
};

const getInitialState = (
  props: WizardProps,
  handlers: WizardHandlers,
  propGetters: WizardPropGetters
): WizardState => {
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
  const state = {
    steps,
    currentStep,
    totalSteps,
    isNextAvailable,
    isPrevAvailable,
  };

  return { ...state, ...handlers, ...propGetters };
};

class Wizard extends React.PureComponent<WizardProps, WizardState> {
  // compound components
  static Navigator = Navigator;
  static StepTracker = StepTracker;
  static Steps = Steps;

  static propTypes = {
    children: WizardPropTypes.children,
  };

  static defaultProps = {
    children: [],
  };

  componentDidUpdate(_: WizardProps, prevState: WizardState) {
    const { currentStep, totalSteps } = this.state;
    if (prevState.currentStep !== currentStep)
      this.handleStepChange(currentStep, totalSteps);
  }

  handleStepChange = (currentStep: number, totalSteps: number) => {
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
  };

  goToStep = (step: number) => {
    const { totalSteps } = this.state;
    if (isInRange(step, 0, totalSteps)) {
      this.setState({ currentStep: step });
    } else {
      console.error(`Step is out of the range [0, ${totalSteps - 1}]`);
    }
  };

  firstStep = () => {
    this.goToStep(0);
  };

  lastStep = () => {
    const { totalSteps } = this.state;
    this.goToStep(totalSteps - 1);
  };

  nextStep = () => {
    const { isNextAvailable } = this.state;
    if (isNextAvailable)
      this.setState(prevState => ({
        currentStep: prevState.currentStep + 1,
      }));
  };

  prevStep = () => {
    const { isPrevAvailable } = this.state;
    if (isPrevAvailable)
      this.setState(prevState => ({
        currentStep: prevState.currentStep - 1,
      }));
  };

  getFirstStepProps = (
    props = { onClick: undefined }
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > => {
    const { isPrevAvailable } = this.state;
    const { onClick, ...rest } = props;
    return {
      ...rest,
      type: 'button',
      role: 'button',
      disabled: !isPrevAvailable,
      onClick: callAll(onClick, this.firstStep),
    };
  };

  getLastStepProps = (
    props = { onClick: undefined }
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > => {
    const { isNextAvailable } = this.state;
    const { onClick, ...rest } = props;
    return {
      ...rest,
      type: 'button',
      role: 'button',
      disabled: !isNextAvailable,
      onClick: callAll(onClick, this.lastStep),
    };
  };

  getNextStepProps = (
    props = { onClick: undefined }
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > => {
    const { isNextAvailable } = this.state;
    const { onClick, ...rest } = props;
    return {
      ...rest,
      type: 'button',
      role: 'button',
      disabled: !isNextAvailable,
      onClick: callAll(onClick, this.nextStep),
    };
  };

  getPrevStepProps = (
    props = { onClick: undefined }
  ): React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > => {
    const { isPrevAvailable } = this.state;
    const { onClick, ...rest } = props;
    return {
      ...rest,
      type: 'button',
      role: 'button',
      disabled: !isPrevAvailable,
      onClick: callAll(onClick, this.prevStep),
    };
  };

  // preventing unnecessary re-renders
  state = getInitialState(
    this.props,
    {
      firstStep: this.firstStep,
      goToStep: this.goToStep,
      lastStep: this.lastStep,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
    },
    {
      getFirstStepProps: this.getFirstStepProps,
      getLastStepProps: this.getLastStepProps,
      getNextStepProps: this.getNextStepProps,
      getPrevStepProps: this.getPrevStepProps,
    }
  );

  render() {
    const { children } = this.props;
    return (
      <div>
        <WizardContext.Provider value={this.state}>
          {children}
        </WizardContext.Provider>
      </div>
    );
  }
}

export default Wizard;

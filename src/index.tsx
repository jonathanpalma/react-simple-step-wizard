import * as React from 'react';

interface WizardProps {
  children: JSX.Element[] | JSX.Element;
}

interface WizardState {
  currentStep: number;
  totalSteps: number;
}

interface NavigatorProps {
  currentStep: number;
  totalSteps: number;
  goToPrevStep(): void;
  goToNextStep(): void;
}

function DefaultNavigator({
  currentStep,
  totalSteps,
  goToPrevStep,
  goToNextStep,
}: NavigatorProps): JSX.Element {
  return (
    <div>
      <button type="button" onClick={goToPrevStep} disabled={currentStep === 0}>
        Previous
      </button>
      <button
        type="button"
        onClick={goToNextStep}
        disabled={currentStep === totalSteps - 1}
      >
        Next
      </button>
    </div>
  );
}

class Wizard extends React.Component<WizardProps, WizardState> {
  state = { currentStep: 0, totalSteps: -1 };

  static getDerivedStateFromProps(props: WizardProps, state: WizardState) {
    const totalSteps = React.Children.count(props.children);
    return totalSteps !== state.totalSteps ? { totalSteps } : null;
  }

  goToNextStep = (): void => {
    this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
  };

  goToPrevStep = (): void => {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
  };

  render() {
    const { children } = this.props;
    const { currentStep, totalSteps } = this.state;
    return (
      <div>
        {totalSteps > 0
          ? React.Children.map(
              children,
              (childElement: React.ReactElement, index) =>
                currentStep === index
                  ? React.cloneElement(childElement, {})
                  : null
            )
          : null}
        <DefaultNavigator
          currentStep={currentStep}
          totalSteps={totalSteps}
          goToPrevStep={this.goToPrevStep}
          goToNextStep={this.goToNextStep}
        />
      </div>
    );
  }
}

export default Wizard;

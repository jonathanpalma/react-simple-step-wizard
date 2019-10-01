import * as React from 'react';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface State {
  currentStep: number;
  totalSteps: number;
}

class Wizard extends React.Component<Props, State> {
  state = { currentStep: 0, totalSteps: -1 };

  static getDerivedStateFromProps(props: Props, state: State) {
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
        <div className="wizard-navigator">
          <button
            type="button"
            onClick={this.goToPrevStep}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={this.goToNextStep}
            disabled={currentStep === totalSteps - 1}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Wizard;

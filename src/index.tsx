import * as React from 'react';
import { Subtract } from 'utility-types';

interface WizardProps {
  children: JSX.Element[] | JSX.Element;
}

interface WizardState {
  currentStep: number;
  totalSteps: number;
}

interface WizardContextState {
  currentStep: number;
  totalSteps: number;
  prevStep(): void;
  nextStep(): void;
}

interface WizardConsumerProps {
  children(args: WizardContextState): JSX.Element;
}

const WizardContext = React.createContext<WizardContextState>(
  {} as WizardContextState
);

// providing wizard context using render-props
export function WizardConsumer({ children }: WizardConsumerProps): JSX.Element {
  return (
    <WizardContext.Consumer>
      {context => {
        if (
          Object.entries(context).length === 0 &&
          context.constructor === Object
        ) {
          throw new Error(
            'Components using WizardContext must be rendered within the Wizard component'
          );
        }
        return children(context);
      }}
    </WizardContext.Consumer>
  );
}

// providing wizard context using higher-order component
export function withWizardContext<T extends WizardContextState>(
  WrappedComponent: React.ComponentType<T>
) {
  return class extends React.Component<Subtract<T, WizardContextState>> {
    render() {
      return (
        <WizardConsumer>
          {context => <WrappedComponent {...(context as T)} />}
        </WizardConsumer>
      );
    }
  };
}

function DefaultNavigator(): JSX.Element {
  return (
    <WizardConsumer>
      {({ currentStep, totalSteps, prevStep, nextStep }) => (
        <div>
          <button type="button" onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
          >
            Next
          </button>
        </div>
      )}
    </WizardConsumer>
  );
}

class Wizard extends React.Component<WizardProps, WizardState> {
  static getDerivedStateFromProps(props: WizardProps, state: WizardState) {
    const totalSteps = React.Children.count(props.children);
    return totalSteps !== state.totalSteps ? { totalSteps } : null;
  }

  nextStep = (): void => {
    this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
  };

  prevStep = (): void => {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
  };

  // Preveting unnecessary re-renders
  state = {
    currentStep: 0,
    totalSteps: -1,
    nextStep: this.nextStep,
    prevStep: this.prevStep,
  };

  render() {
    return (
      <div>
        <WizardContext.Provider value={this.state}>
          {this.state.totalSteps > 0
            ? React.Children.map(
                this.props.children,
                (childElement: React.ReactElement, index) =>
                  this.state.currentStep === index
                    ? React.cloneElement(childElement, {})
                    : null
              )
            : null}
          <DefaultNavigator />
        </WizardContext.Provider>
      </div>
    );
  }
}

export default Wizard;

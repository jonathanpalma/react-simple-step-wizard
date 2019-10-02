import * as React from 'react';
import { Subtract } from 'utility-types';

interface WizardProps {
  children: JSX.Element[] | JSX.Element;
}

interface WizardState {
  currentStep: number;
  totalSteps: number;
}

export interface NavigatorProps {
  currentStep: number;
  totalSteps: number;
  prevStep(): void;
  nextStep(): void;
}

interface CustomNavigatorProps {
  children?: (args: NavigatorProps) => JSX.Element;
}

interface StepsProps {
  children: JSX.Element[] | JSX.Element;
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

function DefaultNavigator({
  currentStep,
  totalSteps,
  prevStep,
  nextStep,
}: NavigatorProps): JSX.Element {
  return (
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
  );
}

function Navigator({ children }: CustomNavigatorProps): JSX.Element {
  return (
    <WizardConsumer>
      {context => (children ? children(context) : DefaultNavigator(context))}
    </WizardConsumer>
  );
}

function Steps({ children }: StepsProps): JSX.Element {
  return <div>{children}</div>;
}

class Wizard extends React.Component<WizardProps, WizardState> {
  // compound components
  static Navigator = Navigator;
  static Steps = Steps;

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

  // Preventing unnecessary re-renders
  state = {
    currentStep: 0,
    totalSteps: -1,
    nextStep: this.nextStep,
    prevStep: this.prevStep,
    compounComponents: [Navigator, Steps],
  };

  render() {
    const { children } = this.props;
    const { compounComponents, ...context } = this.state;
    return (
      <div>
        <WizardContext.Provider value={context}>
          {React.Children.map(
            children,
            (child: React.ReactElement) => {
              if (
                !compounComponents.some(
                  component => component === child.type
                )
              )
                throw new Error(
                  'You can only use compound components within the Wizard component'
                );
              return React.cloneElement(child, {});
            }
          )}
        </WizardContext.Provider>
      </div>
    );
  }
}

export default Wizard;

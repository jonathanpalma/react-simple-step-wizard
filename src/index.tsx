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
      <button type="button" onClick={prevStep} disabled={currentStep <= 0}>
        Previous
      </button>
      <button
        type="button"
        onClick={nextStep}
        disabled={currentStep >= totalSteps - 1}
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

class Wizard extends React.Component<WizardProps, WizardState> {
  // compound components
  static Navigator = Navigator;
  static Steps = Steps;

  // custom prop-types (this will be removed in v2)
  static propTypes = {
    children: WizardPropTypes.children,
  };

  static getDerivedStateFromProps(props: WizardProps, state: WizardState) {
    const totalSteps = React.Children.count(props.children);
    return totalSteps !== state.totalSteps ? { totalSteps } : null;
  }

  nextStep = (): void => {
    if (this.state.currentStep < this.state.totalSteps - 1)
      this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
  };

  prevStep = (): void => {
    if (this.state.currentStep > 0)
      this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
  };

  // Preventing unnecessary re-renders
  state = {
    currentStep: 0,
    totalSteps: 0,
    nextStep: this.nextStep,
    prevStep: this.prevStep,
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

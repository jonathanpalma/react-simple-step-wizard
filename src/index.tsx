import * as React from 'react';
import { Subtract } from 'utility-types';

interface WizardProps {
  children: JSX.Element[] | JSX.Element;
}

interface WizardState {
  currentStep: number;
  totalSteps: number;
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
  prevStep(): void;
  nextStep(): void;
}

export interface NavigatorProps {
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
  prevStep(): void;
  nextStep(): void;
}

interface CustomNavigatorProps {
  children?: (args: NavigatorProps) => JSX.Element;
}

interface StepsProps {
  children: JSX.Element[] | JSX.Element;
}

interface WizardConsumerProps {
  children(args: WizardState): JSX.Element;
}

const WizardContext = React.createContext<WizardState>({} as WizardState);

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
export function withWizardContext<T extends WizardState>(
  WrappedComponent: React.ComponentType<T>
) {
  return class extends React.Component<Subtract<T, WizardState>> {
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
  isNextAvailable,
  isPrevAvailable,
  nextStep,
  prevStep,
}: NavigatorProps): JSX.Element {
  return (
    <div>
      <button type="button" onClick={prevStep} disabled={!isPrevAvailable}>
        Previous
      </button>
      <button type="button" onClick={nextStep} disabled={!isNextAvailable}>
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
  static Steps = Steps;

  // custom prop-types (this will be removed in v2)
  static propTypes = {
    children: WizardPropTypes.children,
  };

  constructor(props: WizardProps) {
    super(props);
    let totalSteps = 0;
    React.Children.forEach(props.children, (child: React.ReactElement) => {
      if (child.type === Steps && child.props.children) {
        totalSteps = child.props.children.length;
      }
    });
    const currentStep = 0;
    const isNextAvailable = currentStep < totalSteps - 1;
    const isPrevAvailable = currentStep > 0;

    // Preventing unnecessary re-renders
    this.state = {
      currentStep,
      totalSteps,
      isNextAvailable,
      isPrevAvailable,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
    };
  }

  nextStep = (): void => {
    if (this.state.isNextAvailable)
      this.setState(prevState => {
        const currentStep = prevState.currentStep + 1;
        return {
          isNextAvailable: Boolean(currentStep < prevState.totalSteps - 1),
          isPrevAvailable: Boolean(currentStep > 0),
          currentStep,
        };
      });
  };

  prevStep = (): void => {
    if (this.state.isPrevAvailable)
      this.setState(prevState => {
        const currentStep = prevState.currentStep - 1;
        return {
          isNextAvailable: Boolean(currentStep < prevState.totalSteps - 1),
          isPrevAvailable: Boolean(currentStep > 0),
          currentStep,
        };
      });
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

import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  WizardState,
  WizardConsumerProps,
  InjectedWizardProps,
} from '../common/types';

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

/* 
  TODO: Fix withWizard types to avoid the following error:
  Argument of type 'typeof MyComponent' is not assignable
  to parameter of type 'ComponentType<InjectedWizardProps>'
  Type 'typeof MyComponent' is not assignable to type
  'FunctionComponent<InjectedWizardProps>'
*/

// providing wizard context using higher-order component
export function withWizard<P extends InjectedWizardProps>(
  Component: React.ComponentType<P>
) {
  function Wrapper(
    props: Omit<P, keyof InjectedWizardProps>,
    ref: React.RefObject<unknown>
  ) {
    return (
      <WizardConsumer>
        {context => <Component ref={ref} wizard={context} {...(props as P)} />}
      </WizardConsumer>
    );
  }
  Wrapper.displayName = `withWizard(${Component.displayName ||
    Component.name})`;
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component);
}

export default WizardContext;

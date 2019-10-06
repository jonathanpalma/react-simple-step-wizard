import * as React from 'react';
import { Subtract } from 'utility-types';
import { WizardState, WizardConsumerProps } from '../common/types';

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

export default WizardContext;

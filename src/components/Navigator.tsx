import * as React from 'react';
import DefaultNavigator from './DefaultNavigator';
import { WizardConsumer } from '../contexts/WizardContext';
import { CustomNavigatorProps } from '../common/types';

function Navigator({ children }: CustomNavigatorProps): JSX.Element {
  return (
    <WizardConsumer>
      {context => (children ? children(context) : DefaultNavigator(context))}
    </WizardConsumer>
  );
}

export default Navigator;

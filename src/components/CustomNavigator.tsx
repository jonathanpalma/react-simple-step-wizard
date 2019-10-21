import * as React from 'react';
import * as PropTypes from 'prop-types';
import DefaultNavigator from './DefaultNavigator';
import { WizardConsumer } from '../contexts/WizardContext';
import { CustomNavigatorProps } from '../common/types';

function CustomNavigator({ children }: CustomNavigatorProps): JSX.Element {
  return <WizardConsumer>{context => children(context)}</WizardConsumer>;
}

CustomNavigator.propTypes = {
  children: PropTypes.func,
};

CustomNavigator.defaultProps = {
  children: DefaultNavigator,
};

export default CustomNavigator;

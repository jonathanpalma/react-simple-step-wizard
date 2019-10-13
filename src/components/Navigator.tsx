import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isFunction } from 'util';
import DefaultNavigator from './DefaultNavigator';
import { WizardConsumer } from '../contexts/WizardContext';
import { CustomNavigatorProps } from '../common/types';

function Navigator({ children }: CustomNavigatorProps): JSX.Element {
  return (
    <WizardConsumer>
      {context =>
        children && isFunction(children) ? (
          children(context)
        ) : (
          <React.Fragment />
        )
      }
    </WizardConsumer>
  );
}

Navigator.propTypes = {
  children: PropTypes.func,
};

Navigator.defaultProps = {
  children: DefaultNavigator,
};

export default Navigator;

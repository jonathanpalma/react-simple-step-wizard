import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
  children: JSX.Element[];
}

function StepGroup({ children, ...rest }: Props) {
  return (
    <React.Fragment>
      {React.Children.map(children, childElement =>
        React.cloneElement(childElement, rest)
      )}
    </React.Fragment>
  );
}

StepGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default StepGroup;

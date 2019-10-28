import * as React from 'react';

function getValidSteps(children: JSX.Element | JSX.Element[]) {
  return React.Children.map(children, (child: React.ReactElement) => {
    const { stepCondition = true } = child.props;
    return stepCondition ? child : null;
  });
}

export default getValidSteps;

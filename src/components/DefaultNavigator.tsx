import * as React from 'react';
import CustomNavigator from './CustomNavigator';

function DefaultNavigator(): JSX.Element {
  return (
    <CustomNavigator>
      {({ getNextStepProps, getPrevStepProps }) => (
        <div>
          <button type="button" {...getPrevStepProps()}>
            Previous
          </button>
          <button type="button" {...getNextStepProps()}>
            Next
          </button>
        </div>
      )}
    </CustomNavigator>
  );
}

export default DefaultNavigator;

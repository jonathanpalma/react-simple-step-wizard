import * as React from 'react';
import { render } from '@testing-library/react';
import Wizard from '../Wizard';

describe('Navigator', () => {
  it('renders custom Navigator', () => {
    const { container } = render(
      <Wizard>
        <Wizard.Navigator>
          {({
            getFirstStepProps,
            getLastStepProps,
            getNextStepProps,
            getPrevStepProps,
          }) => (
            <div>
              <button type="button" {...getFirstStepProps()}>
                &lt;&lt; First
              </button>
              <button type="button" {...getPrevStepProps()}>
                &lt; Back
              </button>
              <button type="button" {...getNextStepProps()}>
                Next &gt;
              </button>
              <button type="button" {...getLastStepProps()}>
                Last &gt;&gt;
              </button>
            </div>
          )}
        </Wizard.Navigator>
      </Wizard>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders default Navigator', () => {
    const { container } = render(
      <Wizard>
        <Wizard.Navigator />
      </Wizard>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

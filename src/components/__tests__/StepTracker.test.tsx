import * as React from 'react';
import { render } from '@testing-library/react';
import Wizard from '../Wizard';

describe('StepTracker', () => {
  it('renders custom StepTracker', () => {
    const { container } = render(
      <Wizard>
        <Wizard.StepTracker>
          {({ currentStep = 0, steps = [] }) => (
            <div>
              <p>Current step is: {steps[currentStep]}</p>
            </div>
          )}
        </Wizard.StepTracker>
      </Wizard>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders default StepTracker', () => {
    const { container } = render(
      <Wizard>
        <Wizard.StepTracker />
      </Wizard>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

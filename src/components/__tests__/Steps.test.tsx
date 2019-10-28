import * as React from 'react';
import { render, getByText } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import Wizard from '../Wizard';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;

describe('Steps', () => {
  it('renders Steps', () => {
    const { container } = render(
      <Wizard>
        <Wizard.Steps>
          <Step1 />
          <Step2 />
        </Wizard.Steps>
      </Wizard>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('throws exception when there is more than one Steps', () => {
    const spyConsoleError = jest.spyOn(console, 'error');
    spyConsoleError.mockImplementation(() => {});

    const { container } = render(
      <ErrorBoundary>
        <Wizard>
          <Wizard.Steps>
            <Step1 />
          </Wizard.Steps>

          <Wizard.Steps>
            <Step1 />
            <Step2 />
          </Wizard.Steps>
        </Wizard>
      </ErrorBoundary>
    );
    expect(getByText(container, /something went wrong/i)).toBeInTheDocument();

    // cleanup
    spyConsoleError.mockRestore();
  });
});

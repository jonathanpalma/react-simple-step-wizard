import React, { Component } from 'react';

import Wizard from 'react-simple-step-wizard';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;
const Step3 = () => <div>This is Step 3</div>;
const Step4 = () => <div>This is Step 4</div>;
const Step5 = () => <div>This is Step 5</div>;

class App extends Component {
  render() {
    return (
      <div>
        <h1>react-simple-step-wizard demo</h1>
        <Wizard>
          <Wizard.Navigator />
          <Wizard.Steps>
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
            <Step5 />
          </Wizard.Steps>
          <Wizard.Navigator>
            {({ isNextAvailable, isPrevAvailable, nextStep, prevStep }) => (
              <div>
                <p>I am a custom Navigator</p>
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={!isPrevAvailable}
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isNextAvailable}
                >
                  Next &gt;
                </button>
              </div>
            )}
          </Wizard.Navigator>
        </Wizard>
      </div>
    );
  }
}

export default App;

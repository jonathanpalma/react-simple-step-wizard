import React, { Component } from 'react';
import Wizard from 'react-simple-step-wizard';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;
const Step3 = () => <div>This is Step 3</div>;
const Step4 = () => <div>This is Step 4</div>;
const Step5 = () => <div>This is Step 5</div>;
const MyNavigator = ({
  isNextAvailable,
  isPrevAvailable,
  nextStep,
  prevStep,
}) => (
  <div>
    <p>I am a custom Navigator</p>
    {isPrevAvailable && (
      <button type="button" onClick={prevStep}>
        &lt; Back
      </button>
    )}
    {isNextAvailable && (
      <button type="button" onClick={nextStep}>
        Next &gt;
      </button>
    )}
  </div>
);

class App extends Component {
  handleStepChange = currentStep => {
    console.log(currentStep);
  };

  render() {
    return (
      <div>
        <h1>react-simple-step-wizard demo</h1>
        <Wizard onStepChange={this.handleStepChange}>
          <Wizard.Steps>
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
            <Step5 />
          </Wizard.Steps>
          <Wizard.Navigator>
            {navigatorProps => <MyNavigator {...navigatorProps} />}
          </Wizard.Navigator>
        </Wizard>
      </div>
    );
  }
}

export default App;

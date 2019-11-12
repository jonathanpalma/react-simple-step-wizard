import React, { Component } from 'react';
import Wizard from 'react-simple-step-wizard';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;
const Step3 = () => <div>This is Step 3</div>;
const Step4 = () => <div>This is Step 4</div>;
const Step5 = () => <div>This is Step 5</div>;
const Step6 = () => <div>This is Step 6</div>;
const MyStepTracker = ({ currentStep = 0, steps = [] }) => (
  <div>
    <p>Current step is: {steps[currentStep]}</p>
  </div>
);
const MyNavigator = ({
  getFirstStepProps,
  getLastStepProps,
  getNextStepProps,
  getPrevStepProps,
  getResetProps,
}) => (
  <div>
    <button {...getFirstStepProps()}>&lt;&lt; First</button>
    <button {...getPrevStepProps()}>&lt; Back</button>
    <button {...getResetProps()}>Reset</button>
    <button {...getNextStepProps()}>Next &gt;</button>
    <button {...getLastStepProps()}>Last &gt;&gt;</button>
  </div>
);

class App extends Component {
  state = { isCustomizeVisible: true };

  onStepChange = currentStep => {
    console.log('Step changed', currentStep);
  };

  onReset = currentStep => {
    console.log('Reset', currentStep);
  };

  toggleCustomizeVisibility = () => {
    this.setState(prevState => ({
      isCustomizeVisible: !prevState.isCustomizeVisible,
    }));
  };

  render() {
    const { isCustomizeVisible } = this.state;
    return (
      <div>
        <h1>react-simple-step-wizard demo</h1>
        <div>
          <p>
            Step &quot;Customize&quot; visible: {isCustomizeVisible.toString()}
          </p>
          <button type="button" onClick={this.toggleCustomizeVisibility}>
            Toggle Customize Step
          </button>
        </div>
        <Wizard initialStep={4} onStepChange={this.onStepChange}>
          <Wizard.StepTracker />
          <Wizard.Steps>
            <Step1 stepLabel="Search" />
            <Step2 stepLabel="Select" />
            <Step3 stepLabel="Customize" stepCondition={isCustomizeVisible} />
            <Step4 stepLabel="Review" />
            <Wizard.StepGroup stepLabel="Submit">
              <Step5 />
              <Step6 />
            </Wizard.StepGroup>
          </Wizard.Steps>
          {/* You can implement your custom components via render-props */}
          <Wizard.StepTracker>
            {stepTrackerProps => <MyStepTracker {...stepTrackerProps} />}
          </Wizard.StepTracker>
          <Wizard.Navigator>
            {navigatorProps => <MyNavigator {...navigatorProps} />}
          </Wizard.Navigator>
        </Wizard>
      </div>
    );
  }
}

export default App;

import Wizard from 'react-simple-step-wizard';
import React, { Component } from 'react';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;
const Step3 = () => <div>This is Step 3</div>;
const Step4 = () => <div>This is Step 4</div>;
const Step5 = () => <div>This is Step 5</div>;
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
);

class App extends Component {
  state = { isCustomizeVisible: true };

  handleStepChange = currentStep => {
    console.log(currentStep);
  };

  onClick = () => {
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
          <p>Step 3 visible: {isCustomizeVisible.toString()}</p>
          <button type="button" onClick={this.onClick}>
            Toggle Step 3
          </button>
        </div>
        <Wizard onStepChange={this.handleStepChange}>
          <Wizard.StepTracker />
          <Wizard.Steps>
            <Step1 stepLabel="Search" />
            <Step2 stepLabel="Select" />
            <Step3 stepLabel="Customize" stepCondition={isCustomizeVisible} />
            <Step4 stepLabel="Review" />
            <Step5 stepLabel="Submit" />
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
